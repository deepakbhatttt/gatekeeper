import React from 'react';
import { Link } from 'react-router-dom';
import dashboard from '../assets/dashboard.png';
import nfc from '../assets/nfc.png';
import '../css/homeCard.css'; // Import the CSS file

const HomeCard = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="row w-100 d-flex justify-content-center align-items-center">
                    <div className="col-lg-6 mb-4">
                        <div className="card h-100 p-4 shadow">
                            <Link to="/scan" className="text-decoration-none">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center text-dark">
                                    <img src={nfc} alt="NFC" className="img-fluid" />
                                    <h5 className="card-title">Scan (Entry/Exit)</h5>
                                    <p className="card-text">Scan NFC tag for entry/exit.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="card h-100 p-4 shadow">
                            <Link to="/dashboard" className="text-decoration-none">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center text-dark">
                                    <img src={dashboard} alt="Dashboard" className="img-fluid" />
                                    <h5 className="card-title">Dashboard</h5>
                                    <p className="card-text">Click here to view dashboard.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
