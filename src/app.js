import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store.js";


import AuthLayout from './components/authLayout.js'
import { Login } from './components/login.js'
import Signup  from './components/signUp.js'

import ErrorPage from "./components/essentials/error";
import App from "./index.js";
import Home from "./Pages/home.js";
import Body from "./Pages/body.js";
import Scan from "./Pages/scan.js";
import Dashboard from "./components/dashboard";
import ManageStudentsData from "./Pages/manageStudents.js";

import DailyEntry  from "./Pages/dailyEntryTable.js"
import DailyInOutData from "./components/daliyInOutData.js"

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <App/>, 
        errorElement : <ErrorPage/>, 
        children: [
            {
                path : "/",
                element : (
                    <AuthLayout authentication={false}>
                        <Body/> {/* Home Page When User is not Logged In */}
                    </AuthLayout>
                ),
            },
            {
                path : "/home",
                element : (
                    <AuthLayout authentication>
                        {" "}
                        <Home />    {/* Home Page When User is Logged In */}
                    </AuthLayout>
                ),
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path : "/dashboard",
                element : (
                    // <AuthLayout authentication={false}>
                     <AuthLayout authentication>  
                        {" "}
                        <Dashboard/>
                    </AuthLayout>
                ),
            },
            {
                path : "/manage",
                element : (
                    // <AuthLayout authentication={false}>
                    <AuthLayout authentication> 
                        {" "}
                        <ManageStudentsData/>
                    </AuthLayout>
                ),
            },
            {
                path : "/scan",
                element : (
                    // <AuthLayout authentication={false}>
                     <AuthLayout authentication> 
                        {" "}
                        <Scan/>
                    </AuthLayout>
                ),
            },
            {
                path : "/in-out-data",
                element : (
                    // <AuthLayout authentication={false}>
                     <AuthLayout authentication> 
                        {" "}
                        <DailyInOutData/>
                    </AuthLayout>
                ),
            }
        ] 
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>    
    </React.StrictMode>
)
