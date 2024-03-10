import React, { useState, useEffect } from 'react';
import { studentList } from '../config';

const NFCReaderWithAttendance = () => {
  const [studentDetails, setStudentDetails] = useState([]);

  const updateStudentDetails = (id, timestamp, type) => {
    let found = false;
    const updatedDetails = studentDetails.map(student => {
      if (student.id === id.toString()) {
        found = true;
        return type === '0' ? 
          { ...student, outTime: student.outTime ? student.outTime : timestamp, inTime: student.outTime ? timestamp : student.inTime } :
          { ...student, inTime: student.inTime ? student.inTime : timestamp, outTime: student.inTime ? timestamp : student.outTime };
      }
      return student;
    });

    if (!found) {
      const studentInfo = studentList.find(student => student.id === id.toString());
      if (studentInfo) {
        const newStudent = type === '0' ? 
          { ...studentInfo, outTime: timestamp } : 
          { ...studentInfo, inTime: timestamp };
        // setStudentDetails([...updatedDetails, newStudent]);
        setStudentDetails(currentDetails => [...currentDetails, newStudent]);

      }
    } else {
      setStudentDetails(updatedDetails);
    }
  };

useEffect(() => {
    const readNFC = async () => {
      if ('NDEFReader' in window) {
        try {
          const ndef = new window.NDEFReader();
          await ndef.scan();
          ndef.onreading = event => {
            const id = new TextDecoder().decode(event.message.records[0].data);
            const student = studentList.find(student => student.id === id.toString());
            if (student) {
              const timestamp = new Date().toLocaleString();
              updateStudentDetails(id, timestamp, student.type);
            }
          };
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      } else {
        console.log('Web NFC is not supported by this browser.');
      }
    };
    
/*
    const readNFC = () => {
        const id = 20011129;
        const student = studentList.find(student => student.id === id.toString());
        if (student) 
        {
              const timestamp = new Date().toLocaleString();
              updateStudentDetails(id, timestamp, student.type);
              console.log(student);
        }
    };
*/
    readNFC();
  }, []);

  return (
    <div>
      <h2>Attendance Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Batch</th>
            <th>MobNo.</th>
            <th>Type</th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          {studentDetails.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.batch}</td>
              <td>{student.mobno}</td>
              <td>{student.type === '0' ? 'Hosteller' : 'Day Scholar'}</td>
              <td>{student.inTime}</td>
              <td>{student.outTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NFCReaderWithAttendance;
