import {
  Form,
  Row,
  FormGroup,
  Button,
  Container,
  Col,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../components/header/header";
import QR from "../../assets/QR.jpeg";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    program: "",
    batch: "",
    semester: "",
    parentsName: "",
    photo: null,
    email: "",
    amount: "",
    paymentDate: "",
    guardianContact: "",
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDrop = (acceptedFiles) => {
    const image = acceptedFiles[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: image,
    }));
    setPreviewImage(URL.createObjectURL(image));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "address",
      "program",
      "batch",
      "semester",
      "parentsName",
      "email",
      "amount",
      "paymentDate",
      "guardianContact",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: "error",
        title: "Form Validation Error",
        text: "Please fill in all required fields",
      });
      return;
    }

    const formDataToUpload = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToUpload.append(key, formData[key]);
    });

    try {
      const response = await axios.post(`/processPayment`, formDataToUpload);
      console.log("Upload response", response.data);

      Swal.fire({
        icon: "success",
        title: "Entry created successfully",
        text: "Your form entry has been created",
        confirmButtonText: "Ok",
      });

      setFormData({
        name: "",
        address: "",
        program: "",
        batch: "",
        semester: "",
        parentsName: "",
        photo: null,
        email: "",
        amount: "",
        paymentDate: "",
        guardianContact: "",
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      console.error("entry creation error", error);
      Swal.fire({
        icon: "error",
        title: "Payment Unsuccessful",
        text: "There was an error while processing the payment",
      });
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "address",
      "program",
      "batch",
      "semester",
      "parentsName",
      "email",
      "amount",
      "paymentDate",
      "guardianContact",
    ];
    return requiredFields.every((field) => formData[field]);
  };

  return (
    <Container className="payment-form">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Form
              onSubmit={handleSubmit}
              className="mt-4"
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                padding: "10px",
              }}
            >
              <Row>
                <FormGroup as={Col} md="6">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="address"
                    value={formData.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} md="6">
                  <Form.Label>Program</Form.Label>
                  <Form.Control
                    type="text"
                    name="program"
                    placeholder="program"
                    value={formData.program}
                    onChange={handleChange}
                    isInvalid={!!errors.program}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.program}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6">
                  <Form.Label>Batch No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="batch"
                    placeholder="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    isInvalid={!!errors.batch}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.batch}
                  </Form.Control.Feedback>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} md="6">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="text"
                    name="semester"
                    placeholder="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    isInvalid={!!errors.semester}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.semester}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6">
                  <Form.Label>Parent Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentsName"
                    placeholder="parent name"
                    value={formData.parentsName}
                    onChange={handleChange}
                    isInvalid={!!errors.parentsName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.parentsName}
                  </Form.Control.Feedback>
                </FormGroup>
              </Row>

              <FormGroup>
                <Form.Label>Photo</Form.Label>
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone-container" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="dropzone-box">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Uploaded"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                          />
                        ) : (
                          <p>Drag & drop a photo here or click to select one</p>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </FormGroup>
              <Row>
                <FormGroup as={Col} md="6">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6">
                  <Form.Label>Guardian Contact</Form.Label>
                  <Form.Control
                    type="number"
                    name="guardianContact"
                    placeholder="contact"
                    value={formData.guardianContact}
                    onChange={handleChange}
                    isInvalid={!!errors.guardianContact}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.guardianContact}
                  </Form.Control.Feedback>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} md="6">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    placeholder="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    isInvalid={!!errors.amount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.amount}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6">
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="paymentDate"
                    placeholder="date"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    isInvalid={!!errors.paymentDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.paymentDate}
                  </Form.Control.Feedback>
                </FormGroup>
              </Row>

              <Button className="mt-3" type="submit" disabled={!isFormValid()}>
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-md-6">
            <center>
              <h3 style={{ marginTop: "20px" }}>Scan Here</h3>
              <img
                src={QR}
                alt="QR Code"
                style={{ height: "200px", width: "200px" }}
              />
            </center>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentForm;
