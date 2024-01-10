import { Form, FormControl, Col, Row } from "react-bootstrap";

const InvoiceForm = ({ semesters, handleChange }) => {
  return (
    <Row>
      <Col md={6}>
        <Form style={{ display: "flex", alignItems: "center" }}>
          <Form.Label>Semester</Form.Label>
          <FormControl
            name="sem"
            as="select"
            value={semesters}
            onChange={handleChange}
            style={{ marginLeft: "5px" }}
          >
            <option value="defaultSemester">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
            <option value="9">Semester 9</option>
          </FormControl>
        </Form>
      </Col>
    </Row>
  );
};

export default InvoiceForm;
