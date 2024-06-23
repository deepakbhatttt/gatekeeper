import React, { useState } from 'react';
import appwriteService from "../appwrite/config.appwrite";
import { Modal, Button, Spinner } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

function TableView({ studentDetails }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const viewStudent = async (id) => {
        try {
            setLoading(true);
            const response = await appwriteService.getStudent(id);
            // console.log("Response:", response);

            if (response && typeof response === 'object') {
                setSelectedStudent(response);
                setShowModal(true);
            } else {
                console.log("No student details found");
            }
        } catch (error) {
            console.log("Error getting student details:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <div className="mt-3">
            {/* <h2>Attendance Table</h2> */}
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentDetails.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.type === '0' ? 'Hosteller' : 'Day Scholar'}</td>
                            <td>{student.inTime}</td>
                            <td>{student.outTime}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => viewStudent(student.id)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <div>
                            <p>ID: {selectedStudent && selectedStudent.id}</p>
                            <p>Name: {selectedStudent && selectedStudent.name}</p>
                            <p>Course: {selectedStudent && selectedStudent.course}</p>
                            <p>Batch: {selectedStudent && selectedStudent.batch}</p>
                            <p>Mobile No.: {selectedStudent && selectedStudent.mobno}</p>
                            <p>Type: {selectedStudent && (selectedStudent.type === '0' ? 'Hosteller' : 'Day Scholar')}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default TableView;