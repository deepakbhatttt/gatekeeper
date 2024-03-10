import React, { useState, useEffect } from 'react';
import { studentList } from './config'; // Import your student data

const NfcReader = () => {
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    if ('NDEFReader' in window) {
      const reader = new NDEFReader();
      reader.scan().then(() => {
        console.log('NFC Reader is scanning...');
        reader.onreading = event => {
          const id = new TextDecoder().decode(event.message.records[0].data);
          // Match NFC ID with student list
          const student = studentList.find(student => student.id === id.toString());
          if (student) {
            setCurrentStudent(student);
          }
        };
      }).catch(error => {
        console.error(`Error: ${error}`);
      });
    }
  }, []);

  return (
    <div>
      {currentStudent ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Mobile No</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentStudent.id}</td>
              <td>{currentStudent.name}</td>
              <td>{currentStudent.course}</td>
              <td>{currentStudent.batch}</td>
              <td>{currentStudent.mobno}</td>
              <td>{currentStudent.type}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Scan a student ID tag.</p>
      )}
    </div>
  );
};

export default NfcReader;
