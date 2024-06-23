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
    const queries = [Query.equal('id', studentInfo.$id), Query.startsWith('createdOn', todayDate)];
    const existingEntries = await appwriteService.getDailyEntryStudentsByDate(queries);

    if (studentInfo.type === 0) { // Hosteller
      if (existingEntries.length === 0 || existingEntries.length % 2 === 0) {
        const student = {
          slug: slug,
          id: studentInfo.$id,
          name: studentInfo.name,
          type: studentInfo.type,
          inTime: "",
          outTime: formattedTimestamp,
          createdOn: new Date().toISOString()
        };
        try {
          await appwriteService.addNewStudentDailyEntry({ ...student });
          setStudentDetails(prevDetails => [...prevDetails, student]);
          setStudentName(studentInfo.name);
          setMessage('NFC Tap Successful');
          setShowModal(true);
        } catch (error) {
          console.error("Error adding daily entry:", error);
          setMessage(`Error adding daily entry: ${error.message}`);
          setShowModal(true);
        }
      } else {
        const lastEntry = existingEntries[existingEntries.length - 1];
        lastEntry.inTime = formattedTimestamp;
        try {
          await appwriteService.updateStudentDailyEntry(lastEntry.slug, lastEntry);
          setStudentDetails(prevDetails => {
            return prevDetails.map(entry => entry.slug === lastEntry.slug ? lastEntry : entry);
          });
          setStudentName(studentInfo.name);
          setMessage('NFC Tap Successful');
          setShowModal(true);
        } catch (error) {
          console.error("Error updating daily entry:", error);
          setMessage(`Error updating daily entry: ${error.message}`);
          setShowModal(true);
        }
      }
    } else if (studentInfo.type === 1) { // Day Scholar
      if (existingEntries.length === 0 || existingEntries.length % 2 === 0) {
        const student = {
          slug: slug,
          id: studentInfo.$id,
          name: studentInfo.name,
          type: studentInfo.type,
          inTime: formattedTimestamp,
          outTime: "",
          createdOn: new Date().toISOString()
        };
        try {
          await appwriteService.addNewStudentDailyEntry({ ...student });
          setStudentDetails(prevDetails => [...prevDetails, student]);
          setStudentName(studentInfo.name);
          setMessage('NFC Tap Successful');
          setShowModal(true);
        } catch (error) {
          console.error("Error adding daily entry:", error);
          setMessage(`Error adding daily entry: ${error.message}`);
          setShowModal(true);
        }
      } else {
        const lastEntry = existingEntries[existingEntries.length - 1];
        lastEntry.outTime = formattedTimestamp;
        try {
          await appwriteService.updateStudentDailyEntry(lastEntry.slug, lastEntry);
          setStudentDetails(prevDetails => {
            return prevDetails.map(entry => entry.slug === lastEntry.slug ? lastEntry : entry);
          });
          setStudentName(studentInfo.name);
          setMessage('NFC Tap Successful');
          setShowModal(true);
        } catch (error) {
          console.error("Error updating daily entry:", error);
          setMessage(`Error updating daily entry: ${error.message}`);
          setShowModal(true);
        }
      }
    }
  };

  useEffect(() => {
    const readNFC = () => {
      if ('NDEFReader' in window) {
        try {
          const ndef = new window.NDEFReader();
          ndef.scan();
          ndef.onreading = async (event) => {
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
          console.error(`Error: ${error}`);
          setMessage(`Error: ${error.message}`);
          setShowModal(true);
        }
      } else {
        console.log('Web NFC is not supported by this browser.');
        setMessage('Web NFC is not supported by this browser.');
        setShowModal(true);
      }
    };

    const fetchDailyEntries = async () => {
      try {
        const response = await appwriteService.getAllDailyStudents();
        setStudentDetails(response.documents);
      } catch (error) {
        console.error("Error fetching daily entries:", error);
        setMessage(`Error fetching daily entries: ${error.message}`);
        setShowModal(true);
      }
    };

    fetchDailyEntries();
    readNFC();
  }, []);

  return (
    <div>
      <h2>Attendance Table (nfcHandle)</h2>
      <TableView studentDetails={studentDetails} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {studentName && <p>Student Name: {studentName}</p>}
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
