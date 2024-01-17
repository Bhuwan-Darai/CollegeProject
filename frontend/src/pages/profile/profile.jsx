import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
// import { useUserContext } from "../../userRoleContext"; // Adjust the import path according to your project structure

const Profile = () => {
  const id = localStorage.getItem("userId");
  //   const { userId } = useUserContext();
  const [profile, setProfile] = useState(null);
  console.log("userid in profile ", id);
  useEffect(() => {
    if (id) {
      axios
        .get(`/profile/${id}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <div>
      <Row>
        <Col md={6}>
          <p>Name: {profile.name}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
