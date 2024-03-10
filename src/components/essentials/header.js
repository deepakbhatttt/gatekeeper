import React from 'react';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky px-lg-3 py-lg-2 shadow-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.614)' }}>
                <div className="container-fluid ">
                    <a className="navbar-brand me-5 fw-bold fs-3 white" href="#">GateKeeper</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link px-4 white" aria-current="page" href="#">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link px-4 white" href="#">Scan</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link px-4 white" href="#">About Us</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <button type="button" className="btn btn-outline-dark me-lg-3 me-2 fw-bold">Log Out</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
