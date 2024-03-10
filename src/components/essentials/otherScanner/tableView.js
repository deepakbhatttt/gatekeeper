import React, { useState } from 'react';
import { studentList } from '../config';

const TableView = ({ studentDetails }) => {
    return (
        <div>
            <h2>Attendance Table</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Batch</th>
                        <th>MobNo.</th>
                        <th>Type</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {studentDetails.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.course}</td>
                            <td>{student.batch}</td>
                            <td>{student.mobno}</td>
                            <td>{student.type === '0' ? 'Hosteller' : 'Day Scholar'}</td>
                            <td>{student.inTime}</td>
                            <td>{student.outTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default TableView;
