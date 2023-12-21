import { Form, Col, Row, Button } from "react-bootstrap";
import Header from "../../components/header/header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFeeStr = () => {
  const navigate = useNavigate();
  const [feeStructure, setFeeStructure] = useState({
    semester: "",
    admissionFee: "",
    tutionFee: "",
    libraryFee: "",
    internalExamFee: "",
    boardExamFee: "",
    infrastructureDevelopmentFee: "",
    labFee: "",
    identityCardFee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    //? change the default feeStructure valeu to new input value using prev hook
    setFeeStructure((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //? Send feeStructure data to backedn api and create fee strucutre
  const handleClick = (e) => {
    //? to prevent form default behaviour
    e.preventDefault();

    //? use axios to communicate with backend
    axios
      .post("/createSemesterFee", feeStructure)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //? after completion navigate to Fee Structure
    navigate("/feeStructure");
  };

  return (
    <div>
      <Header />
      <Form>
        <Row>
          <Col md={6}>
            <Form.Label>Semester</Form.Label>
            <Form.Control
              name="semester"
              type="number"
              value={feeStructure.semester}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Admission Fee</Form.Label>
            <Form.Control
              name="admissionFee"
              type="text"
              value={feeStructure.admissionFee}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label>Tution Fee</Form.Label>
            <Form.Control
              name="tutionFee"
              type="text"
              value={feeStructure.tutionFee}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Library Fee</Form.Label>
            <Form.Control
              name="libraryFee"
              type="text"
              value={feeStructure.libraryFee}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label>Internal Exam Fee</Form.Label>
            <Form.Control
              name="internalExamFee"
              type="text"
              value={feeStructure.internalExamFee}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Board Exam Fee</Form.Label>
            <Form.Control
              name="boardExamFee"
              type="text"
              value={feeStructure.boardExamFee}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label>Infrastructure Development Fee</Form.Label>
            <Form.Control
              name="infrastructureDevelopmentFee"
              type="text"
              value={feeStructure.infrastructureDevelopmentFee}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Lab Fee</Form.Label>
            <Form.Control
              name="labFee"
              type="text"
              value={feeStructure.labFee}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Label>Identity Card Fee</Form.Label>
            <Form.Control
              name="identityCardFee"
              type="text"
              value={feeStructure.identityCardFee}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form>
      <div>
        <Button variant="outline-dark" onClick={handleClick}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateFeeStr;
