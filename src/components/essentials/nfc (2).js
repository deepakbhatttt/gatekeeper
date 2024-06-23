import React, { useState, useEffect } from 'react';
import appwriteService from "../../appwrite/config.appwrite";
import TableView from '../tableView';
import { Modal, Button } from 'react-bootstrap';
import { Query } from 'appwrite';

const NFCReaderWithAttendance = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [message, setMessage] = useState('');
  const [nfcEnabled, setNfcEnabled] = useState(true);

  const generateSlug = (studentId) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    return `${studentId}-${timestamp}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      throw new RangeError('Invalid time value');
    }
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const updateStudentDetails = async (studentInfo, timestamp) => {
    const slug = generateSlug(studentInfo.$id);
    let formattedTimestamp;

    try {
      formattedTimestamp = formatDateTime(new Date(timestamp).toISOString());
    } catch (error) {
      console.error('Invalid timestamp:', error);
      setMessage(`Invalid timestamp: ${error.message}`);
      setShowModal(true);
      return;
    }

    const todayDate = new Date().toISOString().split('T')[0];
    try {
      const existingEntriesResponse = await appwriteService.getDailyEntryStudentsByDate(todayDate);
      const existingEntries = existingEntriesResponse.documents.filter(entry => entry.id === studentInfo.$id);

      if (existingEntries.length === 0) {
        // No entry for today, create a new one
        const student = {
          slug: slug,
          id: studentInfo.$id,
          name: studentInfo.name,
          type: studentInfo.type,
          inTime: formattedTimestamp,
          outTime: "",
          createdOn: new Date().toISOString()
        };
        await appwriteService.addNewStudentDailyEntry(student);
        setStudentDetails(prevDetails => [...prevDetails, student]);
      } else {
        // Update the last existing entry for today
        const lastEntry = existingEntries[existingEntries.length - 1];
        if (!lastEntry.outTime) {
          lastEntry.outTime = formattedTimestamp;
          await appwriteService.updateStudentDailyEntry(lastEntry.$id, { outTime: lastEntry.outTime });
          setStudentDetails(prevDetails =>
            prevDetails.map(entry => entry.$id === lastEntry.$id ? { ...entry, outTime: lastEntry.outTime } : entry)
          );
        } else {
          // Create a new entry for a new visit
          const student = {
            slug: slug,
            id: studentInfo.$id,
            name: studentInfo.name,
            type: studentInfo.type,
            inTime: formattedTimestamp,
            outTime: "",
            createdOn: new Date().toISOString()
          };
          await appwriteService.addNewStudentDailyEntry(student);
          setStudentDetails(prevDetails => [...prevDetails, student]);
        }
      }
      setStudentName(studentInfo.name);
      setMessage('NFC Tap Successful');
      setShowModal(true);
      setNfcEnabled(false);
      setTimeout(() => setNfcEnabled(true), 5000);
    } catch (error) {
      console.error("Error updating daily entry:", error);
      setMessage(`Error updating daily entry: ${error.message}`);
      setShowModal(true);
    }
  };

  useEffect(() => {
    let ndef;

    const readNFC = () => {
      if ('NDEFReader' in window && nfcEnabled) {
        try {
          ndef = new window.NDEFReader();
          ndef.scan();
          ndef.onreading = async (event) => {
            if (!nfcEnabled) return;
            setNfcEnabled(false);
            setTimeout(() => setNfcEnabled(true), 1000);

            try {
              console.log('NFC event:', event);
              if (event.message.records.length > 0) {
                const record = event.message.records[0];
                if (record.data) {
                  const id = new TextDecoder().decode(record.data);
                  console.log(`NFC Tag ID: ${id}`);
                  const response = await appwriteService.getStudent(id);
                  if (response) {
                    const timestamp = new Date().toLocaleString();
                    await updateStudentDetails(response, timestamp);
                  } else {
                    console.log("Student Not Found");
                    setMessage('Student Not Found');
                    setShowModal(true);
                  }
                } else {
                  console.error('NFC record data is undefined');
                  setMessage('NFC record data is undefined');
                  setShowModal(true);
                }
              } else {
                console.error('No data found in NFC message records');
                setMessage('No data found in NFC message records');
                setShowModal(true);
              }
            } catch (error) {
              console.error("Error processing NFC message:", error);
              setMessage(`Error processing NFC message: ${error.message}`);
              setShowModal(true);
            }
          };
        } catch (error) {
          console.error(`Error initializing NFC reader: ${error}`);
          setMessage(`Error initializing NFC reader: ${error.message}`);
          setShowModal(true);
        }
      } else {
        console.log('Web NFC is not supported by this browser.');
        // setMessage('Web NFC is not supported by this browser.');
        // setShowModal(true);
      }
    };

    const fetchDailyEntries = async () => {
      try {
        const response = await appwriteService.getAllDailyStudents();
        setStudentDetails(response.documents);
      } catch (error) {
        console.error("Error fetching daily entries:", error);
      }
    };

    fetchDailyEntries();
    readNFC();

    // Cleanup function to remove event listener
    return () => {
      if (ndef) {
        ndef.onreading = null;
      }
    };
  }, [nfcEnabled]);

  return (
    <div>
      <h2>Attendance Table (NFC Handle)</h2>
      <TableView studentDetails={studentDetails} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{studentName ? `Welcome, ${studentName}` : 'NFC Tap Result'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NFCReaderWithAttendance;
