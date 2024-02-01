import "./student.css";
import { useEffect, useState } from "react";
import { Button, Table, Form, Modal, FormControl } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import admin from "../assets/admin.png";
import "../../pages/createStudent/createStudent";
import Header from "../../components/header/header";

function Student() {
  // const Students = () => {
  const [student, setStudent] = useState([]);
  const [show, setShow] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [semester, setSemester] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/getStudents/${semester}`)
      .then((res) => {
        if (res.data.length > 0) {
          setStudent(res.data);
        } else {
          setStudent([]);
        }
      })
      .catch(() => {
        setStudent([]);
      });
  }, [semester]);

  //function to delete Student
  const deleteStudent = (id) => {
    //eslint-disable-next-line
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    axios
      .delete(`/deleteStudent/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  //function to goBack after click of Add Student Btn
  const goBack = () => {
    navigate("/CreateStudent");
  };

  const updateStudent = (student) => {
    handleShow();
    setUpdatedStudent(student);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSemester = (e) => {
    setSemester(e.target.value);
  };

  const saveUpdatedStudent = () => {
    axios
      .put(`/updateStudent/${updatedStudent._id}`, updatedStudent)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <>
      <div>
        <Header />

        <div
          className="d-flex "
          style={{ marginTop: "50px", justifyContent: "space-between" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form style={{ display: "flex", alignItems: "center" }}>
              <Form.Label>
                <b>Semester: </b>
              </Form.Label>
              <FormControl
                name="sem"
                as="select"
                value={semester}
                onChange={handleSemester}
                style={{ marginLeft: "5px" }}
              >
                <option value="defaultSemester">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
                <option value="9">Semester 9</option>
              </FormControl>
            </Form>
          </div>
          <Button
            variant="outline-primary"
            style={{ marginRight: "20px" }}
            onClick={() => goBack()}
          >
            Add Student{" "}
          </Button>
        </div>
        {student.length === 0 ? (
          <div className="student-available-info">
            No students available for requested semester
          </div>
        ) : (
          <div className="table-responsive">
            <Table bordered hover className="student-table">
              <thead className="table-head">
                <tr>
                  <th>Roll</th>
                  <th>Semester</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Guardian Name</th>
                  <th>Contact</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {student.map((student) => (
                  <tr key={student._id} className="text-center">
                    <td>{student.roll} </td>
                    <td>{student.semester} </td>
                    <td>{student.name} </td>
                    <td>{student.email} </td>
                    <td>{student.guardianName} </td>
                    <td>{student.contact} </td>
                    <td>{student.gender} </td>
                    <td>{student.status} </td>
                    <td>
                      <Button
                        variant="outline-success"
                        style={{ marginRight: "5px" }}
                        onClick={() => updateStudent(student)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outline-danger"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        <Modal style={{ marginLeft: "50px" }} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  name="roll"
                  placeholder="Roll number"
                  type="number"
                  value={updatedStudent.roll ? updatedStudent.roll : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="semester"
                  placeholder="semester"
                  type="text"
                  value={updatedStudent.semester ? updatedStudent.semester : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="name"
                  placeholder="Name of Student"
                  type="text"
                  value={updatedStudent.name ? updatedStudent.name : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={updatedStudent.email ? updatedStudent.email : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="guardianName"
                  placeholder="Guardian Name"
                  value={
                    updatedStudent.guardianName
                      ? updatedStudent.guardianName
                      : ""
                  }
                  onChange={handleChange}
                />

                <Form.Control
                  name="contact"
                  placeholder="Contact"
                  type="number"
                  value={updatedStudent.contact ? updatedStudent.contact : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  as="select"
                  name="gender"
                  value={updatedStudent.gender ? updatedStudent.gender : ""}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedStudent}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Student;
