// import React, { useState } from 'react';
// import appwriteService from "../appwrite/config.appwrite";
// import TableView from './tableView';
// import { Button, Input } from "./master";

// const DailyInOutData = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [studentDetails, setStudentDetails] = useState([]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleViewClick = async () => {
//     try {
//       const response = await appwriteService.getDailyEntryStudentsByDate(selectedDate);
//       if (response) {
//         const formattedEntries = response.documents.map(entry => ({
//           ...entry,
//           inTime: new Date(entry.inTime).toLocaleString(),
//           outTime: entry.outTime ? new Date(entry.outTime).toLocaleString() : null,
//           createdOn: new Date(entry.createdOn).toLocaleString(),
//         }));
//         setStudentDetails(formattedEntries);
//       }
//     } catch (error) {
//       console.error("Error fetching daily entries:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Daily In-Out Data</h2>
//       <div className="date-picker-container">
//         <Input 
//           type="date" 
//           value={selectedDate} 
//           onChange={handleDateChange} 
//         />
//         <Button onClick={handleViewClick}>View</Button>
//       </div>
//       <TableView studentDetails={studentDetails} />
//     </div>
//   );
// };

// export default DailyInOutData;


import React, { useState } from 'react';
import appwriteService from "../appwrite/config.appwrite";
import TableView from './tableView';
import { Button, Input } from "./master";

const DailyInOutData = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [noData, setNoData] = useState(false);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleViewClick = async () => {
        try {
            const response = await appwriteService.getDailyEntryStudentsByDate(selectedDate);
            if (response.documents.length > 0) {
                const formattedEntries = response.documents.map(entry => ({
                    ...entry,
                    inTime: new Date(entry.inTime).toLocaleString(),
                    outTime: entry.outTime ? new Date(entry.outTime).toLocaleString() : null,
                    createdOn: new Date(entry.createdOn).toLocaleString(),
                }));
                setStudentDetails(formattedEntries);
                setNoData(false);
            } else {
                setStudentDetails([]);
                setNoData(true);
            }
        } catch (error) {
            console.error("Error fetching daily entries:", error);
            setStudentDetails([]);
            setNoData(true);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <h2>Daily In-Out Data</h2>
                <h5>Select the Date</h5>
                <div className="date-picker-container my-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        max={today}
                        style={{ width: '250px' }}
                    />
                    <Button onClick={handleViewClick}>View</Button>
                </div>
            </div>
            {noData ? (
                <p style={{ textAlign: 'center', display: 'flex' }}>No Data Found</p>
            ) : (
                <TableView studentDetails={studentDetails} />
            )}
        </>
    );
};

export default DailyInOutData;
