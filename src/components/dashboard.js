import React from 'react';
import { Link } from 'react-router-dom';
import allStudents from "../assets/allStudents.png";
import entryExit from '../assets/entryExit.png';
import '../css/global.css'; // Import the global CSS file

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-heading">Dashboard</h2>
            <div className="row mt-5">
                {/* Card for IN/OUT Data */}
                <div className="col-lg-6 mb-4">
                    <div className="card h-100 p-4 shadow">
                        <Link to="/in-out-data" className="text-decoration-none">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center text-dark">
                                <img src={entryExit} alt="Entry-Exit" className="img-fluid mb-3" style={{ maxHeight: '100px' }} />
                                <h5 className="card-title">IN/OUT Data</h5>
                                <p className="card-text">View IN/OUT data recorded daily.</p>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* Card for All Students Data */}
                <div className="col-lg-6 mb-4">
                    <div className="card h-100 p-4 shadow">
                        <Link to="/manage" className="text-decoration-none">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center text-dark">
                                <img src={allStudents} alt="all-Students-Data" className="img-fluid mb-3" style={{ maxHeight: '100px' }} />          
                                <h5 className="card-title">Manage Students Data</h5>
                                <p className="card-text">View and Manage data of all students.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
