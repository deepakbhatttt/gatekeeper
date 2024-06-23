// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
/*
const AddStudentModal = ({ show, handleClose, handleSave }) => {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    course: '',
    batch: '',
    mobno: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={student.id}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Course</Form.Label>
            <Form.Control
              type="text"
              name="course"
              value={student.course}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Batch</Form.Label>
            <Form.Control
              type="text"
              name="batch"
              value={student.batch}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              name="mobno"
              value={student.mobno}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={student.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="0">Hosteller</option>
              <option value="1">Day Scholar</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave(student)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
*/
// import React, { useState } from 'react';

/*
const AddStudentComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState({
    id: '',
    name: '',
    course: '',
    batch: '',
    mobno: '',
    type: '',
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would handle saving the student data
    console.log(student);
    handleClose();
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        Add Student
      </button>

      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Student</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" placeholder="Student ID" name="id" value={student.id} onChange={handleChange} />
                <input type="text" className="form-control mb-2" placeholder="Name" name="name" value={student.name} onChange={handleChange} />
                <input type="text" className="form-control mb-2" placeholder="Course" name="course" value={student.course} onChange={handleChange} />
                <input type="text" className="form-control mb-2" placeholder="Batch" name="batch" value={student.batch} onChange={handleChange} />
                <input type="text" className="form-control mb-2" placeholder="Mobile No" name="mobno" value={student.mobno} onChange={handleChange} />
                <select className="form-control" name="type" value={student.type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="0">Hosteller</option>
                  <option value="1">Day Scholar</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudentComponent;
*/

import React, { useState } from 'react';

function AddStudentComponent() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: '', name: '', course: '', batch: '', mobno: '', type: '', inTime: '', outTime: ''
  });

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setStudents([...students, { ...newStudent, inTime: '', outTime: '' }]);
    setShowModal(false);
    // Reset form after save
    setNewStudent({ id: '', name: '', course: '', batch: '', mobno: '', type: '', inTime: '', outTime: '' });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Student</button>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Student</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Add form fields here */}
                <input type="text" className="form-control mb-2" placeholder="Student ID" name="id" value={newStudent.id} onChange={handleInputChange} />
                <input type="text" className="form-control mb-2" placeholder="Name" name="name" value={newStudent.name} onChange={handleInputChange} />
                <input type="text" className="form-control mb-2" placeholder="Course" name="course" value={newStudent.course} onChange={handleInputChange} />
                <input type="text" className="form-control mb-2" placeholder="Batch" name="batch" value={newStudent.batch} onChange={handleInputChange} />
                <input type="text" className="form-control mb-2" placeholder="Mobile No" name="mobno" value={newStudent.mobno} onChange={handleInputChange} />
                <select className="form-control" name="type" value={newStudent.type} onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  <option value="0">Hosteller</option>
                  <option value="1">Day Scholar</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student list table */}
      <div>
        <h2>Student List</h2>
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
            {students.map((student, index) => (
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
    </div>
  );
}

export default AddStudentComponent;

// export default AddStudentModal;
