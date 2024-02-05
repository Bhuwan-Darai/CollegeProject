import "./table.css";
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  FormControl,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../userRoleContext";

const TableComponent = () => {
  const [semester, setSemester] = useState(1);
  const [feeStructure, setFeeStructure] = useState([]);
  const [updatedFeeStr, setUpdatedFeeStr] = useState({
    _id: "",
    semester: "",
    admissionFee: "",
    tutionFee: "",
    libraryFee: "",
    internalExamFee: "",
    boardExamFee: "",
    infrastructureDevelopmentFee: "",
    labFee: "",
    identityCardFee: "",
    totalFee: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useUserContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .post(`/fees`, { semester })
      .then((res) => {
        if (res.data.fee && res.data.fee.length > 0) {
          setFeeStructure(res.data.fee);
        } else {
          setFeeStructure([]);
        }
      })
      .catch((res) => {
        console.log(res.data.message);
        setFeeStructure([]);
      });
  }, [semester]);

  const createFee = () => {
    navigate("/feeStructure/CreateFee");
  };

  const deleteFeeStr = (feeStructureId) => {
    axios
      .delete(`/deleteFeeStructure/${feeStructureId}`)
      .then((res) => {
        console.log(res.data);
        setFeeStructure((prevFeeStructure) =>
          prevFeeStructure.filter((fee) => fee._id !== feeStructureId),
        );
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  const handleChange = (e) => {
    setSemester(e.target.value);
  };

  const updateFeeStr = (feeStructureId) => {
    handleShow();
    const selectedFee = feeStructure.find((fee) => fee._id === feeStructureId);
    setUpdatedFeeStr({ ...selectedFee });
  };

  const saveUpdatedFeeStr = () => {
    axios
      .put(`/updateFeeStructure/${updatedFeeStr._id}`, updatedFeeStr)
      .then((response) => {
        const { message, update } = response.data;
        console.log(message);
        setFeeStructure((prev) =>
          prev.map((fee) => (fee._id === updatedFeeStr._id ? update : fee)),
        );
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedFeeStr((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Container
        fluid
        style={{
          marginTop: "40px",
          boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.5)",
          height: "65vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "2px solid black",
            marginBottom: "20px",
          }}
        >
          <h4>Aadikavi Bhanubhankta Campus </h4>
          <span>Estd.2004</span>
          <h5>vyas-1 Bigyanchaur, Damauli </h5>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form style={{ display: "flex", alignItems: "center" }}>
            <Form.Label>Semester: </Form.Label>
            <FormControl
              name="sem"
              as="select"
              value={semester}
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
        </div>
        {feeStructure.length === 0 ? (
          <div className="no-feestructure">No fee structure available.</div>
        ) : (
          <Table bordered hover className="feestructure-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount (Rs.)</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((fee) => (
                <tr key={fee._id}>
                  <td>
                    <ol>
                      <li>Admission Fee</li>
                      <li>Tution Fee</li>
                      <li>Library Fee</li>
                      <li>Internal Exam Fee</li>
                      <li>Board Exam Fee</li>
                      <li>Infrastructure Development Fee</li>
                      <li>Lab Fee</li>
                      <li>Identity Card Fee</li>
                    </ol>
                  </td>
                  <td>
                    <ol style={{ listStyleType: "none" }}>
                      <li>{fee.admissionFee}</li>
                      <li>{fee.tutionFee}</li>
                      <li>{fee.libraryFee}</li>
                      <li>{fee.internalExamFee}</li>
                      <li>{fee.boardExamFee}</li>
                      <li>{fee.infrastructureDevelopmentFee}</li>
                      <li>{fee.labFee}</li>
                      <li>{fee.identityCardFee}</li>
                    </ol>
                  </td>
                  <td>Rs. {fee.totalFee}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {userRole.includes("Admin") && (
                      <>
                        <Button
                          variant="outline-success"
                          onClick={() => updateFeeStr(fee._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          style={{ marginLeft: "5px" }}
                          onClick={() => deleteFeeStr(fee._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    {userRole.includes("Accountant") && (
                      <div className="d-felx jusify-content-spacebetween">
                        <Button
                          variant="outline-success"
                          onClick={() => updateFeeStr(fee._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          style={{ marginLeft: "5px" }}
                          onClick={() => deleteFeeStr(fee._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {/* {userRole.includes("Admin") && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={() => createFee()}>Create Fee Structure</Button>
          </div>
        )} */}

        {userRole.includes("Accountant") && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={() => createFee()}>Create Fee Structure</Button>
          </div>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Fee Structure</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Control
                      name="_id"
                      type="hidden"
                      value={updatedFeeStr._id}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                      name="semester"
                      placeholder="Semester"
                      type="text"
                      value={
                        updatedFeeStr.semester ? updatedFeeStr.semester : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Admission Fee</Form.Label>
                    <Form.Control
                      name="admissionFee"
                      placeholder="Admission Fee"
                      type="text"
                      value={
                        updatedFeeStr.admissionFee
                          ? updatedFeeStr.admissionFee
                          : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Tuition Fee</Form.Label>
                    <Form.Control
                      name="tutionFee"
                      placeholder="Tuition Fee"
                      type="text"
                      value={
                        updatedFeeStr.tutionFee ? updatedFeeStr.tutionFee : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Library Fee</Form.Label>
                    <Form.Control
                      name="libraryFee"
                      placeholder="Library Fee"
                      type="text"
                      value={
                        updatedFeeStr.libraryFee ? updatedFeeStr.libraryFee : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Internal Exam Fee</Form.Label>
                    <Form.Control
                      name="internalExamFee"
                      placeholder="Internal Exam Fee"
                      type="text"
                      value={
                        updatedFeeStr.internalExamFee
                          ? updatedFeeStr.internalExamFee
                          : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Board Exam Fee</Form.Label>
                    <Form.Control
                      name="boardExamFee"
                      placeholder="Board Exam Fee"
                      type="text"
                      value={
                        updatedFeeStr.boardExamFee
                          ? updatedFeeStr.boardExamFee
                          : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Infrastructure Devlopment Fee</Form.Label>
                    <Form.Control
                      name="infrastructureDevelopmentFee"
                      placeholder="Infrastructure Development Fee"
                      type="text"
                      value={
                        updatedFeeStr.infrastructureDevelopmentFee
                          ? updatedFeeStr.infrastructureDevelopmentFee
                          : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Lab Fee</Form.Label>
                    <Form.Control
                      name="labFee"
                      placeholder="Lab Fee"
                      type="text"
                      value={updatedFeeStr.labFee ? updatedFeeStr.labFee : ""}
                      onChange={handleUpdate}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Identity Card Fee</Form.Label>
                    <Form.Control
                      name="identityCardFee"
                      placeholder="Identity Card Fee"
                      type="text"
                      value={
                        updatedFeeStr.identityCardFee
                          ? updatedFeeStr.identityCardFee
                          : ""
                      }
                      onChange={handleUpdate}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedFeeStr}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default TableComponent;
