/*
import React, { useState, useEffect } from 'react';

import { studentList } from '../config';
import TableView from './tableView';

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
    // const readNFC = async () => {
    //   if ('NDEFReader' in window) {
    //     try {
    //       const ndef = new window.NDEFReader();
    //       await ndef.scan();
    //       ndef.onreading = event => {
    //         const id = new TextDecoder().decode(event.message.records[0].data);
    //         const student = studentList.find(student => student.id === id.toString());
    //         if (student) {
    //           const timestamp = new Date().toLocaleString();
    //           updateStudentDetails(id, timestamp, student.type);
    //         }
    //       };
    //     } catch (error) {
    //       console.error(`Error: ${error}`);
    //     }
    //   } else {
    //     console.log('Web NFC is not supported by this browser.');
    //   }
    // };
    

    const readNFC = () => {
        const id = 20011128;
        const student = studentList.find(student => student.id === id.toString());
        if (student) 
        {
              const timestamp = new Date().toLocaleString();
              updateStudentDetails(id, timestamp, student.type);
              console.log(student);
        }
    };

    readNFC();
  }, []);

  return (
    <TableView studentDetails={studentDetails}/>
    // <div>
    //   <h2>Attendance Table</h2>
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th>SNo.</th>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Course</th>
    //         <th>Batch</th>
    //         <th>MobNo.</th>
    //         <th>Type</th>
    //         <th>In Time</th>
    //         <th>Out Time</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {studentDetails.map((student, index) => (
    //         <tr key={index}>
    //           <td>{index + 1}</td>
    //           <td>{student.id}</td>
    //           <td>{student.name}</td>
    //           <td>{student.course}</td>
    //           <td>{student.batch}</td>
    //           <td>{student.mobno}</td>
    //           <td>{student.type === '0' ? 'Hosteller' : 'Day Scholar'}</td>
    //           <td>{student.inTime}</td>
    //           <td>{student.outTime}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default NFCReaderWithAttendance;
*/

// import React, { useState, useEffect } from 'react';

// import appwriteService from "../appwrite/config.appwrite";
// import TableView from './tableView'; 

// const NFCReaderWithAttendance = () => {
//   const [studentDetails, setStudentDetails] = useState([]);

//   const updateStudentDetails = (id, timestamp, type) => {
//     // Check if the student with the given ID is already in studentDetails
//     const existingStudent = studentDetails.find(student => student.id === id.toString());

//     if (existingStudent) {
//       // Update the existing student's details based on the type (inTime or outTime)
//       const updatedStudent = {
//         ...existingStudent,
//         inTime: type === '0' ? timestamp : existingStudent.inTime,
//         outTime: type === '1' ? timestamp : existingStudent.outTime
//       };

//       // Replace the existing student in the array with updated details
//       const updatedDetails = studentDetails.map(student =>
//         student.id === id.toString() ? updatedStudent : student
//       );

//       setStudentDetails(updatedDetails);
//     } else {
//       // If student not found in studentDetails, add a new entry
//       const newStudent = {
//         id: id.toString(),
//         inTime: type === '0' ? timestamp : null,
//         outTime: type === '1' ? timestamp : null
//       };

//       setStudentDetails([...studentDetails, newStudent]);
//     }
//   };

//   useEffect(() => {
//     // Simulate reading NFC data (replace this with actual NFC integration)
//     const readNFC = () => {
//       const id = 20011128;
//       const timestamp = new Date().toLocaleString();
//       const studentType = '0'; // Assuming a default student type for simulation

//       updateStudentDetails(id, timestamp, studentType);
//     };

//     readNFC(); // Trigger NFC read on component mount (simulated)
//   }, []); // Empty dependency array ensures this effect runs once on mount

//   return (
//     <div>
//       <h2>Attendance Table</h2>
//       <TableView studentDetails={studentDetails} />
//     </div>
//   );
// };

// export default NFCReaderWithAttendance;

/*
import React, { useState, useEffect } from 'react';
import appwriteService from "../../appwrite/config.appwrite";
import TableView from '../tableView';

const NFCReaderWithAttendance = () => {
  const [studentDetails, setStudentDetails] = useState([]);

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
    // console.log(studentInfo);
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
      // inTime: timestamp,
      inTime: formattedTimestamp,
      // outTime: timestamp,
      outTime: formattedTimestamp,
      createdOn: new Date().toISOString()
    };

    // Add the student to the daily entry collection
    try {
      await appwriteService.addNewStudentDailyEntry({ ...student });
    } catch (error) {
      console.error("Error adding daily entry:", error);
    }


  };


  useEffect(() => {
    
    // const readNFC = async () => {
    //   const id = 20011128;
    //     const timestamp = new Date().toLocaleString();
    //     // console.log("time" + timestamp);

    //     const response = await appwriteService.getStudent(id);
    //     if (response) {
    //       console.log(response);
    //       await updateStudentDetails(response, timestamp);
    //     } else {
    //       console.log("Student Not Found");
    //     }
    //   }

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
      // <h2>Attendance Table (nfcHandle)</h2> 
      <TableView studentDetails={studentDetails} />
    </div>
  );
};
export default NFCReaderWithAttendance;
*/

import React, { useState, useEffect } from 'react';
import appwriteService from "../../appwrite/config.appwrite";
import TableView from '../tableView';
import { Modal, Button } from 'react-bootstrap';
import '../../css/nfcHandle.css';

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

  const formatDateTime = (date) => {
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const updateStudentDetails = async (studentInfo, timestamp) => {
    const slug = generateSlug(studentInfo.$id);
    const formattedTimestamp = formatDateTime(new Date(timestamp));

    const todayDate = new Date().toISOString().split('T')[0];
    try {
      const existingEntriesResponse = await appwriteService.getDailyEntryStudentsByDate(todayDate);
      const existingEntries = existingEntriesResponse.documents.filter(entry => entry.id === studentInfo.$id);

      if (existingEntries.length === 0) {
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
        const lastEntry = existingEntries[existingEntries.length - 1];
        if (!lastEntry.outTime) {
          lastEntry.outTime = formattedTimestamp;
          await appwriteService.updateStudentDailyEntry(lastEntry.$id, { outTime: lastEntry.outTime });
          setStudentDetails(prevDetails =>
            prevDetails.map(entry => entry.$id === lastEntry.$id ? { ...entry, outTime: lastEntry.outTime } : entry)
          );
        } else {
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
                    const timestamp = new Date().toISOString();
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
      }
    };

    const fetchDailyEntries = async () => {
      try {
        const response = await appwriteService.getAllDailyStudents();
        const todayDate = new Date().toISOString().split('T')[0];
        const todayEntries = response.documents.filter(entry => entry.createdOn.split('T')[0] === todayDate);
        setStudentDetails(todayEntries);
      } catch (error) {
        console.error("Error fetching daily entries:", error);
      }
    };

    fetchDailyEntries();
    readNFC();

    return () => {
      if (ndef) {
        ndef.onreading = null;
      }
    };
  }, [nfcEnabled]);

  return (
    <div className="nfc-container">
      <h2 className="text-center mb-4 text-white">Attendance Table (NFC Handle)</h2>
      <div className="glass-effect p-4">
        <TableView studentDetails={studentDetails} />
      </div>
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








// useEffect(() => {
//   const readNFC = () => {
//     if ('NDEFReader' in window) {
//       try {
//         const ndef = new window.NDEFReader();
//         ndef.scan();
//         ndef.onreading = async (event) => {
//           const id = new TextDecoder().decode(event.message.records[0].data);
//           try {
//             const response = await appwriteService.getStudent(id);
//             if (response) {
//               await updateStudentDetails(response, timestamp);
//             } else {
//               console.log("Student Not Found");
//             }
//           } catch (error) {
//             console.error("Error getting student details:", error);
//           }
//         };
//       } catch (error) {
//         console.error(`Error: ${error}`);
//       }
//     } else {
//       console.log('Web NFC is not supported by this browser.');
//     }
//   };
  
  

//   const readNFC = () => {
//       const id = 20011128;
//       const student = studentList.find(student => student.id === id.toString());
//       if (student) 
//       {
//             const timestamp = new Date().toLocaleString();
//             updateStudentDetails(id, timestamp, student.type);
//             console.log(student);
//       }
//   };

//   readNFC();
// }, []);


/*
const readNFC = () => {
  if ('NDEFReader' in window) {
    try {
      const ndef = new window.NDEFReader();
      ndef.scan();
      ndef.onreading = async (event) => {
        const id = new TextDecoder().decode(event.message.records[0].data);
        try {
          const response = await appwriteService.getStudent(id);
          if (response) {
            await updateStudentDetails(response, timestamp);
          } else {
            console.log("Student Not Found");
          }
        } catch (error) {
          console.error("Error getting student details:", error);
        }
      };
    } catch (error) {
      console.error("Error:", $error);
    }
  } else {
    console.log('Web NFC is not supported by this browser.');
  }
};
*/

/*
let updatedStudent;
        if (isExistingStudent) {
          // Update the existing student's details
          updatedStudent = {
            ...studentDetails[existingStudentIndex],
            inTime: type === '0' ? timestamp : studentDetails[existingStudentIndex].inTime,
            outTime: type === '1' ? timestamp : studentDetails[existingStudentIndex].outTime
          };
          
          // Update the existing student in the array
          const updatedDetails = [...studentDetails];
          updatedDetails[existingStudentIndex] = updatedStudent;
          setStudentDetails(updatedDetails);
        } else {
          // Add a new entry to studentDetails with fetched student details
          updatedStudent = {
            id: studentId,
            name: studentInfo.name,
            type: studentInfo.type,
            inTime: type === '0' ? timestamp : null,
            outTime: type === '1' ? timestamp : null
          };
          setStudentDetails([...studentDetails, updatedStudent]);
        }
      } catch (error) {
        console.log("Error fetching student details:", error);
      }
    };
    */