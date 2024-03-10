const TableView = () => {
    const [studentDetails, setStudentDetails] = useState([]);

    const handleNfcTap = (id) => {
        // Find student details by ID
        const student = studentList.find(student => student.id === id);
        if (student) {
            // Check if the student already exists in studentDetails state
            const existingStudent = studentDetails.find(s => s.id === id);

            // Get current timestamp
            const timestamp = new Date().toLocaleString();

            // Update timestamps based on student type
            if (student.type === '0') {
                if (!existingStudent) {
                    // For Hosteller, first tap is out time
                    setStudentDetails([...studentDetails, { ...student, outTime: timestamp }]);
                } else {
                    // For Hosteller, second tap is in time
                    setStudentDetails(studentDetails.map(s => s.id === id ? { ...s, inTime: timestamp } : s));
                }
            } else {
                if (!existingStudent) {
                    // For Day Scholar, first tap is in time
                    setStudentDetails([...studentDetails, { ...student, inTime: timestamp }]);
                } else {
                    // For Day Scholar, second tap is out time
                    setStudentDetails(studentDetails.map(s => s.id === id ? { ...s, outTime: timestamp } : s));
                }
            }
        } else {
            console.log('Student not found');
        }
    };

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