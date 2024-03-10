import React from 'react';
// import { Link } from 'react-router-dom';

const HomeCard = () => {
    return (
        <div className="row">
            <div className="col-lg-6 mb-4">
                <div className="card h-100 p-3 m-4"> 
                    <a href="/scan" className="text-decoration-none"> {/* Anchor tag */}
                        <div className="card-body d-flex flex-column justify-content-center align-items-center"> {/* Center content */}
                            <h5 className="card-title">Scan (Entry/Exit)</h5>
                            <p className="card-text">Click here to scan NFC tag for entry/exit.</p>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-lg-6 mb-4">
                <div className="card h-100 p-3 m-4"> 
                    <a href="/dashboard" className="text-decoration-none"> {/* Anchor tag */}
                        <div className="card-body d-flex flex-column justify-content-center align-items-center"> {/* Center content */}
                            <h5 className="card-title">Dashboard</h5>
                            <p className="card-text">Click here to view dashboard.</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
