import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {useDispatch, Provider} from "react-redux";
import store from "./store/store.js";

import LoginForm from "./components/login";
import authService from "./appwrite/auth.js";
import {login, logout} from "./store/authSlice.js"

import ErrorPage from "./components/essentials/error";
import Header from "./components/essentials/header";
import Footer from "./components/essentials/footer";
import Body from "./components/body";
import NFCReaderWithAttendance from "./components/dummy04";
import Dashboard from "./components/dashboard";
import App from "./index.js";


const AppLayout = () => {
/*
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(()=>{
        authService.getCurrentUser()
        .then((userData)=>{
            if(userData){
                dispatch(login(userData))
            }else{
                dispatch(logout())
            }
        })
        .finally(()=> setLoading(false));
    },[])
    */
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>   
        </>
    );
};

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout/>, 
        errorElement : <ErrorPage/>, 
        children: [
            {
                path : "/",
                element : <Body/>
            },
            {
                path : "/dashboard",
                element : <Dashboard/>
            },
            {
                path : "/scan",
                element : <NFCReaderWithAttendance/>
            }
        ] 
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

// root.render(<AppLayout/>);

/*
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>    
    </React.StrictMode>
)
*/