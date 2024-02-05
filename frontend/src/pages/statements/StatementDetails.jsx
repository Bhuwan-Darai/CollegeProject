import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa";

function StatementDetails() {
  const { id } = useParams();
  const [payments, setPayments] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    axios
      .get(`/payments/${id}`)
      .then((res) => {
        setPayments(res.data.payment);
        setIsVerified(res.data.payment.verified);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const slipUrl = payments.photo
    ? `data:image/png;base64,${payments.photo}`
    : "no slip to display";

  const handleClick = () => {
    const email = payments.email;

    axios
      .post(`/verify/payment`, { id, email })
      .then(() => {
        setIsVerified(true);
        // Call the mail verification route
        axios
          .post(`/sendMailVerification`, {
            userEmail: payments.email,
            userName: payments.name,
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Verification Successful",
              text: "The payment has been successfully verified, and email has been sent!",
              confirmButtonText: "Ok",
            });
          })
          .catch((mailError) => {
            console.log("Error sending verification email", mailError);
            Swal.fire({
              icon: "error",
              title: "Verification Successful, but Email Sending Failed",
              text: "There was an error while sending the verification email",
            });
          });
      })
      .catch((error) => {
        console.log("Error verifying payment", error);

        Swal.fire({
          icon: "error",
          title: "Verification Unsuccessful",
          text: "There was an error while verifying the payment",
        });
      });
  };

  return (
    <div>
      <Header />
      <div>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Card style={{ width: "70vw", height: "70vh" }}>
            <Card.Header style={{ backgroundColor: "#224952", color: "white" }}>
              Payment Details
            </Card.Header>
            <Card.Body style={{ backgroundColor: "#b4f2e9" }}>
              <Container>
                <Row>
                  <Col md={6}>
                    <div style={{ textAlign: "center" }}>
                      <h4>Aadikavi Bhanubhankta Campus </h4>
                      <span>Estd. 2004</span>
                      <h5>vyas-1 Bigyanchaur, Damauli </h5>
                    </div>
                    <div>
                      <Row>
                        <Col md="6"> Name: {payments.name}</Col>
                        <Col md="6"> Semester: {payments.semester}</Col>
                      </Row>
                      <Row>
                        <Col md="6"> Contact: {payments.guardianContact}</Col>
                        <Col md="6"> Email: {payments.email}</Col>
                      </Row>
                      <Row>
                        <Col md="6"> Address: {payments.address} </Col>
                        <Col md="6"> Payment Date: {payments.paymentDate}</Col>
                      </Row>
                      <Row>
                        <Col md="6"> Parents Name: {payments.parentsName}</Col>
                        <Col md="6"> Amount: {payments.amount}</Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md={6}>
                    <Image
                      src={slipUrl}
                      alt="payment slip photo"
                      style={{ width: "100%", height: "100%" }}
                      onError={(e) =>
                        console.log("Error while loading the photo", e)
                      }
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer
              style={{
                backgroundColor: "#224952",
                textAlign: "center",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleClick}
                disabled={isVerified}
                variant={isVerified ? "success" : "primary"}
                style={{ marginRight: "10px" }}
              >
                {isVerified ? "Verified" : "Verify"}
              </Button>
              {isVerified && <FaCheck color="green" size={20} />}
            </Card.Footer>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default StatementDetails;
