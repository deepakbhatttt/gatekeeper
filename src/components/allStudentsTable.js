import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config.appwrite";
import "../css/allStudentsTable.css";

function AllStudentsTable() {
  const [students, setStudents] = useState([]);

  const handleDelete = async (id) => {
    try {
      await appwriteService.deleteStudent(id);
      // Update the student list after deletion
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  useEffect(() => {
    // Fetch students data on component mount
    appwriteService.getAllStudent([]).then((response) => {
      if (response) {
        setStudents(response.documents);
      }
    });
  }, []);

  return (
    <div className="table-container">
      {/* <h2 className="my-4">Attendance Table</h2> */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="bg-dark text-white">
            <tr>
              <th>SNo.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Batch</th>
              <th>MobNo.</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.batch}</td>
                <td>{student.mobno}</td>
                <td>{student.type === '0' ? 'Hosteller' : 'Day Scholar'}</td>
                <td>
                  <button className='btn btn-danger btn-sm' onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllStudentsTable;

/*
import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config.appwrite";

function AllStudentsTable() {
  const [students, setStudents] = useState([]);
  
  const handleDelete = async (id) => {
    try {
      await appwriteService.deleteStudent(id);
    } catch (error) {
      console.log("Error deleting student:", error);
    }
    
  };

  useEffect(() => {
    appwriteService.getAllStudent([]).then((response) => {
      if (response) {
        setStudents(response.documents);
      }
    });
  }, [handleDelete]);

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
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.batch}</td>
                <td>{student.mobno}</td>
                <td>{student.type === '0' ? 'Hosteller' : 'Day Scholar'}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default AllStudentsTable;
*/