import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from React Bootstrap
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = React.useState(false); // State to control the visibility of the modal

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
        setShowModal(false); // Close the modal after logout
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-light btn-outline-dark me-lg-3 me-2 fw-bold"
                onClick={() => setShowModal(true)} // Show modal on button click
            >
                Logout
            </button>
            {/* Logout confirmation modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}> {/* Use danger variant for logout button */}
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LogoutBtn;

/*
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }
    return(
        <button 
        type="button" className="btn btn-outline-dark me-lg-3 me-2 fw-bold"
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn;
*/