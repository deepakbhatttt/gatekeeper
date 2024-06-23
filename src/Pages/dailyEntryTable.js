import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config.appwrite";
import TableView from '../components/tableView'

const DailyEntry = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        appwriteService.getAllStudent([]).then((response) => {
            if (response) {
                setStudents(response.documents);
            }
        });
    }, []);
    return (
        <>
            <div className='w-full py-8'>
                <TableView studentDetails={students} />
            </div>
        </>
    )
}
export default DailyEntry;






