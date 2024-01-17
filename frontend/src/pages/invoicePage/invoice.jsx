import { useEffect, useState, useRef, forwardRef } from "react";
import Header from "../../components/header/header";
import InvoiceTable from "../../components/invoice/InvoiceTable";
import { Container, Col, Row, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

// eslint-disable-next-line react/display-name
const InvoiceContent = forwardRef(({ invoice, getMonthName }, ref) => (
  <div>
    <div ref={ref}>
      <div>
        <div style={{ textAlign: "center", backgroundColor: "pink" }}>
          <h3>AADIKAVI BHANUBHAKTA CAMPUS</h3>
        </div>
        <div
          style={{
            border: "2px solid blue",
            borderRadius: "15px",
            backgroundColor: "white",
          }}
        >
          <Row>
            <Col md={6}>
              <p>Month Name: {getMonthName(invoice.paymentDate)}</p>
              <p>Student Name: {invoice.name}</p>
              <p>Regd. No.: </p>
              <p>Faculty: BICTE</p>
              <p>Batch: </p>
            </Col>
            <Col md={6}>
              <p>Bill No.: {invoice._id}</p>
              <p>Date: {new Date(invoice.paymentDate).toLocaleDateString()}</p>
              <p>Roll No. :</p>
              <p>Level: Bachelor</p>
              <p>Semester: {invoice.semester}</p>
            </Col>
          </Row>
        </div>
      </div>
      <div
        style={{
          border: "2px solid blue",
          marginTop: "5px",
          backgroundColor: "white",
        }}
      >
        <InvoiceTable invoice={invoice} />
      </div>
    </div>
  </div>
));

const Invoice = () => {
  const [semester, setSemester] = useState("defaultSemester");
  const [invoice, setInvoice] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    if (semester !== "defaultSemester") {
      axios
        .get(`/invoice/${semester}`)
        .then((res) => {
          setInvoice(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [semester]);

  const handleChange = (e) => {
    setSemester(e.target.value);
  };

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long" });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });

  return (
    <>
      <Header />
      <Container
        fluid
        style={{ border: "1px solid black", backgroundColor: "pink" }}
      >
        <Row>
          <Col md={6}>
            <Form style={{ display: "flex", alignItems: "center" }}>
              <Form.Label>Semester</Form.Label>
              <FormControl
                as="select"
                value={semester}
                onChange={handleChange}
                style={{ marginLeft: "5px" }}
              >
                <option value="defaultSemester">Select Semester</option>
                {[...Array(9)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Semester {i + 1}
                  </option>
                ))}
              </FormControl>
            </Form>
          </Col>
        </Row>

        {invoice && (
          <InvoiceContent
            ref={componentRef}
            invoice={invoice}
            getMonthName={getMonthName}
          />
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handlePrint}>Generate PDF</button>
        </div>
      </Container>
    </>
  );
};

export default Invoice;
