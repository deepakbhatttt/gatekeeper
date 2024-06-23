import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

import {LogoutBtn} from "./logoutBtn";
const Header = () => {
    // const authStatus = useSelector((state)=>state.auth.status);
    // const navigate = useNavigate( );
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky px-lg-3 py-lg-2 shadow-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.614)' }}>
                <div className="container-fluid ">
                    <Link className="navbar-brand me-5 fw-bold fs-3 white" to="/">GateKeeper</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link px-4 white" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-4 white" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-4 white" to="/scan">Scan</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-4 white" to="/about">About Us</Link>
                            </li>
                        </ul>

                        {/* <div className="d-flex">
                            {authStatus && (
                                <>
                                    <LogoutBtn/>
                                </>
                            )}
                            
                        </div> */}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
