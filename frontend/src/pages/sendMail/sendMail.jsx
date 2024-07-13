import {
  Container,
  Form,
  Row,
  FormGroup,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import Header from "../../components/header/header";
import axios from "axios";
import { useState } from "react";
import "./sendMail.css";

const SendMail = () => {
  const [mail, setMail] = useState({
    userName: "",
    userEmail: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errors = {};

    if (!mail.userName) {
      errors.userName = "User Name is required";
    }

    if (!mail.userEmail) {
      errors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mail.userEmail)) {
      errors.userEmail = "Email is invalid";
    }

    if (!mail.dueDate) {
      errors.dueDate = "Due Date is required";
    }

    return errors;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("/sendMail", mail)
        .then((res) => {
          console.log(res);
          setSuccessMessage("Email sent successfully!");
          setMail({
            userName: "",
            userEmail: "",
            dueDate: "",
          });
          setErrors({});
        })
        .catch((err) => {
          console.log("Data is not sent", err);
          setSuccessMessage("");
        });
    } else {
      setErrors(validationErrors);
      setSuccessMessage("");
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Header />
      <h5 style={{ marginTop: "10px" }}>Send due notification email</h5>
      <Container>
        <Form className="sendmail-container">
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Row>
            <FormGroup as={Col} md="6">
              <label>User Name</label>
              <Form.Control
                name="userName"
                type="text"
                placeholder="user name"
                value={mail.userName}
                onChange={handleChange}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup as={Col} md="6">
              <label>Email</label>
              <Form.Control
                type="email"
                name="userEmail"
                placeholder="john@gmail.com"
                value={mail.userEmail}
                onChange={handleChange}
                isInvalid={!!errors.userEmail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userEmail}
              </Form.Control.Feedback>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup as={Col} md="6">
              <label>Due Date</label>
              <Form.Control
                type="date"
                name="dueDate"
                value={mail.dueDate}
                onChange={handleChange}
                isInvalid={!!errors.dueDate}
                min={getCurrentDate()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dueDate}
              </Form.Control.Feedback>
            </FormGroup>
          </Row>
          <Row>
            <Form.Group>
              <Button
                className="submitBtn"
                variant="outline-primary"
                onClick={handleClick}
              >
                Send
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default SendMail;
