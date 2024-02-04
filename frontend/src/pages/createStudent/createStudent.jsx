import { Button, Form, Row, FormGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
// import { MDBFile } from "mdb-react-ui-kit";
import swal from "sweetalert";
import { useState } from "react";
import axios from "axios";
import "./createStudent.css";

function CreateStudent() {
  //useNavigate to switch between pages
  const navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    gender: "",
    semester: "",
    email: "",
    guardianName: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;

    //change the default post value to new input value using prev hook
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //send data to backend api and store it on databse after call of api
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/registerStudent", post);

      // Success alert
      swal("Success", "Student created successfully", "success");
    } catch (error) {
      if (error.response) {
        const errMessage = JSON.stringify(error.response.data);

        swal({
          title: "Error",
          text: errMessage,
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      } else if (error.request) {
        swal("Network Error", "Please check internet connection");
      } else {
        swal("Error while creating student");
      }
    }
  };

  return (
    <div className="formContainer ">
      <Header />
      <h3
        style={{ marginTop: "20px", marginBottom: "10px", marginLeft: "140px" }}
      >
        Fill this form
      </h3>
      <Form className="create-student-form">
        <Row>
          <FormGroup as={Col} md="6">
            {" "}
            <label>Student Name</label>
            <Form.Control
              name="name"
              placeholder="Name of Student"
              type="text"
              value={post.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <label>Gender</label>
            <Form.Control
              name="gender"
              placeholder="Gender"
              as="select"
              value={post.gender}
              onChange={handleChange}
              type="text"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </FormGroup>
        </Row>
        <Row>
          {" "}
          <FormGroup as={Col} md="6">
            <label>Semester</label>
            <Form.Control
              as="select"
              name="semester"
              value={post.semester}
              onChange={handleChange}
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </Form.Control>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} md="6">
            <label>Guardian Name</label>
            <Form.Control
              name="guardianName"
              placeholder="Guardian Name"
              value={post.guardianName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <label>Contact</label>
            <Form.Control
              name="contact"
              placeholder="Contact"
              type="number"
              value={post.contact}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} md="6">
            <label>Email ID</label>
            <Form.Control
              name="email"
              placeholder="Email"
              type="email"
              value={post.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <label>Password</label>
            <Form.Control
              name="password"
              placeholder="Password"
              type="password"
              value={post.password}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>
        <Row>
          {" "}
          <Form.Group>
            <Button
              className="submitBtn"
              variant="outline-primary"
              onClick={handleClick}
            >
              Submit
            </Button>
            <Button
              style={{ marginLeft: "1rem" }}
              className="submitBtn"
              variant="outline-dark"
              onClick={() => navigate("/Students")}
            >
              Manage Student
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default CreateStudent;
