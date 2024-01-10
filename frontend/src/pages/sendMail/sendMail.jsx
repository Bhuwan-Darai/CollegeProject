import { Container, Form, Row, FormGroup, Col, Button } from "react-bootstrap";
import Header from "../../components/header/header";
import axios from "axios";
import { useState } from "react";

const SendMail = () => {
  const [mail, setMail] = useState({
    userName: "",
    userEmail: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMail((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post("/sendMail", mail)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log("Data is not send ", err));
  };

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Row>
            <FormGroup as={Col} md="6">
              <label>User Name</label>
              <Form.Control
                name="userName"
                type="text"
                value={mail.userName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup as={Col} md="6">
              <label>Email </label>
              <Form.Control
                type="email"
                name="userEmail"
                value={mail.userEmail}
                onChange={handleChange}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup as={Col} md="6">
              <label>Due Date</label>
              <Form.Control
                type="text"
                name="dueDate"
                value={mail.dueDate}
                onChange={handleChange}
              />
            </FormGroup>
          </Row>
          <Row>
            <Form.Group>
              <Button
                className="submitBtn"
                variant="outline-primary"
                onClick={handleClick}
              >
                Submit
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default SendMail;
