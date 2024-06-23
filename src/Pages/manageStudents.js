import React, { useState } from 'react';
import { Button, Modal} from 'react-bootstrap';

import AddStudentForm from "../components/AddForm/AddStudentForm";
import AllStudentsTable from "../components/allStudentsTable";

const ManageStudentsData = () => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
/*
    const handleAddStudent = () => {
        handleCloseModal(); 
    }
*/
    return (
        <div className="container">
            <h2 className="text-center mt-5">Manage Students Data</h2>
            <div className="text-end mb-3">
                <Button variant="primary" onClick={handleShowModal}>Add New Student</Button>
            </div>
            <AllStudentsTable/>
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddStudentForm/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageStudentsData;
