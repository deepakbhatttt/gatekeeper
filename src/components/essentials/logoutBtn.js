import React from "react";
import { UseDispatch, useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
// import { isButtonElement } from "react-router-dom/dist/dom";

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return(
        <button type="button" className="btn btn-outline-dark me-lg-3 me-2 fw-bold">Logout</button>
    )
}