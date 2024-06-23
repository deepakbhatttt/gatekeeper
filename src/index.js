import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";

import authService from "./appwrite/auth.js";
import {login, logout} from "./store/authSlice.js";
import Header from "./components/essentials/header.js";
import Footer from "./components/essentials/footer.js";

const App = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        authService.getCurrentUser()
        .then((userData)=>{
            if(userData){
                dispatch(login({userData}));
            }else{
                dispatch(logout());
            }
        })
        .finally(()=> setLoading(false));
    },[])

    return !loading ? (
        <>
        <div className="d-flex flex-wrap justify-content-between ">
            <div className="w-100 d-block ">
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
        </>
    ): null
};

export default App;