import { useRouteError } from "react-router-dom";

const ErrorPage = ()=>{

    const error = useRouteError();

    return(
        <>
            <h1>Oops........!</h1>
            <h3>Something Went Wrong</h3>
            <p>{error.status+ " : " +error.statusText}</p>
        </>
    );
};

export default ErrorPage;