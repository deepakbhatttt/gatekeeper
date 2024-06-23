import React, { useState, useEffect } from 'react';
import appwriteService from "../../appwrite/config.appwrite";
import TableView from '../tableView';
import { Modal, Button } from 'react-bootstrap';

const NFCReaderWithAttendance = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');

  // Creating Unique Slug Value
  const generateSlug = (studentId) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    return `${studentId}-${timestamp}`;
  };

  // Formatting Date and Time
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
    console.log(studentInfo);
    const slug = generateSlug(studentInfo.$id);

    let formattedTimestamp;
    try {
      formattedTimestamp = formatDateTime(new Date(timestamp).toISOString());
    } catch (error) {
      console.error('Invalid timestamp:', error);
      return;
    }

    // Create the student object for the daily entry
    const student = {
      slug: slug,
      id: studentInfo.$id,
      name: studentInfo.name,
      type: studentInfo.type,
      inTime: formattedTimestamp,
      outTime: formattedTimestamp,
      createdOn: new Date().toISOString()
    };

    // Add the student to the daily entry collection
    try {
      await appwriteService.addNewStudentDailyEntry({ ...student });
      setStudentDetails(prevDetails => [...prevDetails, student]);
      setStudentName(studentInfo.name);
      setShowModal(true);
    } catch (error) {
      console.error("Error adding daily entry:", error);
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
              if (event.message.records.length > 0 && event.message.records[0].data) {
                const id = new TextDecoder().decode(event.message.records[0].data);
                console.log(`NFC Tag ID: ${id}`);

                const response = await appwriteService.getStudent(id);
                if (response) {
                  const timestamp = new Date().toLocaleString();
                  await updateStudentDetails(response, timestamp);
                } else {
                  console.log("Student Not Found");
                }
              } else {
                console.error('No data found in NFC message records');
              }
            } catch (error) {
              console.error("Error processing NFC message:", error);
            }
          };
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      } else {
        console.log('Web NFC is not supported by this browser.');
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
  }, []);

  return (
    <div>
      <h2>Attendance Table (nfcHandle)</h2>
      <TableView studentDetails={studentDetails} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>NFC Tap Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Student Name: {studentName}</p>
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
