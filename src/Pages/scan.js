
/*import NFCReaderWithAttendance from "../components/nfcHandle";

const Scan = ()=>{

    return(
        <>
            <NFCReaderWithAttendance/>
        </>
    ) 
}
export default Scan;
*/
/*
import React from 'react';
import { Container, Table } from 'react-bootstrap';
import NFCReaderWithAttendance from '../components/nfcHandle';

const Scan = () => {
    return (
        <Container fluid>
            <h2 className="text-center mt-3">Scan Page</h2>
            <NFCReaderWithAttendance />
        </Container>
    );
};

export default Scan;
*/
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import NFCReaderWithAttendance from '../components/DailyEntry/nfcHandle';

const Scan = () => {
    return (
        <Container fluid>
            <h2 className="text-center mt-3"></h2>
            <NFCReaderWithAttendance />
        </Container>
    );
};

export default Scan;
