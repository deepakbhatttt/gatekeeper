import React, { useState, useEffect } from 'react';
import { studentList } from '../config';

const NFCReader = () => {
    const [studentData, setStudentData] = useState(null);
    const readNFC = async () => {
        if ('NDEFReader' in window) {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                ndef.onreading = event => {
                    const id = new TextDecoder().decode(event.message.records[0].data);
                    const matchedStudent = studentList.find(student => student.id === id.toString());
                    if (matchedStudent) {
                        setStudentData(matchedStudent);
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
//Dummy For Checking
    const readNFC = () => {
        const id = 20011128;
        const matchedStudent = studentList.find(student => student.id === id.toString());
        if (matchedStudent) {
            setStudentData(matchedStudent);
            // console.log();
        }
    };
*/

    useEffect(() => {
        readNFC();
    }, []);

    return (
        <div>
            {studentData ? (
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
                            <td>{studentData.id}</td>
                            <td>{studentData.name}</td>
                            <td>{studentData.course}</td>
                            <td>{studentData.batch}</td>
                            <td>{studentData.mobno}</td>
                            <td>{studentData.type}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No student data found.</p>
            )}
        </div>
    );
};

export default NFCReader;
