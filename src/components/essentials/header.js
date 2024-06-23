import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogoutBtn } from "./logoutBtn";
import '../../css/header.css'; // Import the CSS file

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Dashboard',
            slug: "/dashboard",
            active: authStatus
        },
        {
            name: 'Scan',
            slug: "/scan",
            active: authStatus
        },
        {
            name: 'About Us',
            slug: "/about-us",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
    ]

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top px-lg-3 py-lg-2 shadow-sm custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand me-5 fw-bold fs-3 text-white" to="/">GateKeeper</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name} className="nav-item">
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className='btn nav-link me-lg-3 me-2 fw-bold text-white'
                                        >{item.name}</button>
                                    </li>
                                ) : null
                            )}
                        </ul>
                        <div className="d-flex">
                            {authStatus && (
                                <>
                                    <LogoutBtn />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
