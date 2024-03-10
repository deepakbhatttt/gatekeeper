import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import LoginForm from "./components/login";
import Header from "./components/essentials/header";
import Body from "./components/body";
import Footer from "./components/essentials/footer";
import Dashboard from "./components/dashboard";
import ErrorPage from "./components/essentials/error";
// import NFCScan from "./components/scanHandle";
import NFCReaderWithAttendance from "./components/dummy04";
const AppLayout = () => {
    return (
        <>
            {/* <LoginForm/> */}
            <Header/>
            {/* <Body/> */}
            <NFCReaderWithAttendance/>
            <Footer/>
        </>
    );
};

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout/>, 
        errorElement : <ErrorPage/>  
    },
    {
        path : "/dashboard",
        element : <Dashboard/>
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
