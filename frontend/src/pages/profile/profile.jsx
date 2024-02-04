import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import { Card, Button } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const getProfile = async () => {
      try {
        const response = await axios.get(
          `/getUserProfile/${userId}/${userRole}`,
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      getProfile();
    }
  }, [userRole]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />

      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "18rem" }}>
          <Card.Header style={{ backgroundColor: "#224952", color: "white" }}>
            {user.name}s Profile
          </Card.Header>
          <Card.Body style={{ backgroundColor: "#b4f2e9" }}>
            {userRole === "Accountant" && (
              <>
                <Card.Text>Email: {user.email}</Card.Text>

                <Card.Text>Contact: {user.contact}</Card.Text>
                <Card.Text>Role: {user.role}</Card.Text>
              </>
            )}
            {userRole === "User" && (
              <>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Admission Number: {user.admissionNumber}</Card.Text>

                <Card.Text>Semester: {user.semester}</Card.Text>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Guadian Name: {user.guardianName}</Card.Text>
                <Card.Text>Contact: {user.contact}</Card.Text>
                <Card.Text>Gender: {user.gender}</Card.Text>
                <Card.Text>Role: {user.role}</Card.Text>
                <Card.Text>Status: {user.status}</Card.Text>
              </>
            )}
          </Card.Body>
          <Card.Footer
            className="text-muted"
            style={{ backgroundColor: "#224952" }}
          >
            <Button variant="secondary">Close</Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
