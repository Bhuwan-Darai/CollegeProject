import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function StatementDetails() {
  //? Extracting the id parameter from the URL
  const { id } = useParams();
  console.log("id parameter is :", id);
  //? State to store the payment details
  const [payments, setPayments] = useState({});

  useEffect(() => {
    axios
      .get(`/payments/${id}`)
      .then((res) => {
        setPayments(res.data.payment);
        console.log(res.data.payment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const slipUrl = payments.photo
    ? `data:image/png;base64,${payments.photo}`
    : "no slip to display";
  console.log("Slip Url ", slipUrl);

  const handleClick = () => {
    axios.post(`/verify/payment`, id);
  };
  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md={6} style={{ border: "1px solid red" }}>
            <div style={{ textAlign: "center" }}>
              <h4>Aadikavi Bhanubhankta Campus </h4>
              <span>Estd.2004</span>
              <h5>vyas-1 Bigyanchaur, Damauli </h5>
            </div>
            <div style={{ border: "1px solid red" }}>
              <Row>
                <Col md="6"> Name : {payments.name}</Col>
                <Col md="6"> Semester : {payments.semester}</Col>
              </Row>
              <Row>
                <Col md="6"> Contact : {payments.guardianContact}</Col>
                <Col md="6"> Email : {payments.email}</Col>
              </Row>
              <Row>
                <Col md="6"> Address : {payments.address} </Col>
                <Col md="6"> payment Date : {payments.paymentDate}</Col>
              </Row>
              <Row>
                <Col md="6">Parents Name : {payments.parentsName}</Col>
                <Col md="6"> Amount : {payments.amount}</Col>
              </Row>
            </div>
          </Col>
          <Col md={6} style={{ border: "1px solid blue" }}>
            <Image
              src={slipUrl}
              alt="payment slip photo"
              style={{ width: "100%" }}
              onError={(e) => console.log("Error while loading the photo", e)}
            />
          </Col>
        </Row>
      </Container>
      <div>
        <Button onClick={handleClick}>Verifiy</Button>
      </div>
    </div>
  );
}

export default StatementDetails;
