import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { MDBFile } from "mdb-react-ui-kit";

import { useState } from "react";
import axios from "axios";
import "./createAccountant.css";
import Header from "../../components/header/header";

function CreateAccountant() {
  //useNavigate to switch between pages
  const navigate = useNavigate();

  const [accountant, setAccountant] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    //change the default post value to new input value using prev hook
    setAccountant((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //send data to backend api and store it on databse after call of api
  const handleClick = (e) => {
    //to prevent form default behaviour OF FORM
    e.preventDefault();

    //use axios to communicate with backend
    axios
      .post("/registerAccountant", accountant)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // after completion navigate to posts
    navigate("/accountant");
  };

  return (
    <div className="formContainer ">
      <div>
        <Header />
      </div>
      <Form className="create-accountant-form">
        <Form.Group>
          <h1>Fill this form</h1>

          <label>Accountant Name</label>
          <Form.Control
            name="name"
            placeholder="Name of Accountant"
            type="text"
            value={accountant.name}
            onChange={handleChange}
          />

          <label>Contact</label>
          <Form.Control
            name="contact"
            placeholder="contact"
            type="number"
            value={accountant.contact}
            onChange={handleChange}
          />
          <label>Email ID</label>
          <Form.Control
            name="email"
            placeholder="Email"
            type="email"
            value={accountant.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <Form.Control
            name="password"
            placeholder="Password"
            value={accountant.password}
            onChange={handleChange}
          />

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
            onClick={() => navigate("/accountant")}
          >
            Manage Accountant
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateAccountant;
