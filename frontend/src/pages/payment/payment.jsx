import { Form, Row, FormGroup, Button, Container, Col } from "react-bootstrap";
import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../components/header/header";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get userId from localStorage

    const {
      name,
      address,
      program,
      batch,
      semester,
      parentsName,
      email,
      amount,
      paymentDate,
      photo,
      guardianContact,
    } = formData;

    const formDataToUpload = new FormData();
    formDataToUpload.append("name", name);
    formDataToUpload.append("address", address);
    formDataToUpload.append("program", program);
    formDataToUpload.append("batch", batch);
    formDataToUpload.append("semester", semester);
    formDataToUpload.append("parentsName", parentsName);
    formDataToUpload.append("email", email);
    formDataToUpload.append("amount", amount);
    formDataToUpload.append("paymentDate", paymentDate);
    formDataToUpload.append("photo", photo);
    formDataToUpload.append("guardianContact", guardianContact);

    try {
      const response = await axios.post(`/processPayment`, formDataToUpload);
      console.log("Upload response", response.data);

      // show sweet alert on successful upload
      Swal.fire({
        icon: "success",
        title: "Entry created successfully",
        text: "Your form entry has been created",
        confirmButtonText: "Ok",
      });

      // Clear form fields after successful upload
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
    } catch (error) {
      console.error("entry creation error", error);
      Swal.fire({
        icon: "error",
        title: "Payment Unsuccessful",
        text: "There was an  while payment",
      });
    }
  };

  return (
    <Container className="  ">
      <Header />
      <Form onSubmit={handleSubmit} className="mt-4">
        <Row>
          <FormGroup as={Col} md="6">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} md="6">
            <Form.Label>Program</Form.Label>
            <Form.Control
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Batch No.</Form.Label>
            <Form.Control
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} md="6">
            <Form.Label>Semester</Form.Label>
            <Form.Control
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              type="text"
              name="parentsName"
              value={formData.parentsName}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>

        <FormGroup as={Col} md="6">
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
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Guardian Contact</Form.Label>
            <Form.Control
              type="number"
              name="guardianContact"
              value={formData.guardianContact}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col} md="6">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup as={Col} md="6">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
            />
          </FormGroup>
        </Row>

        <Button className="mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentForm;
