// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Col, Row } from "react-bootstrap";
// // import { useUserContext } from "../../userRoleContext"; // Adjust the import path according to your project structure
// import Header from "../../components/header/header";

// const Profile = () => {
//   const id = localStorage.getItem("userId");
//   //   const { userId } = useUserContext();
//   const [profile, setProfile] = useState(null);
//   console.log("userid in profile ", id);
//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`/profile`)
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [id]);

//   if (!profile) {
//     return <div>Loading...</div>; // Or any other loading state representation
//   }

//   return (
//     <div>
//       <Header />
//       <Row>
//         <Col md={6}>
//           <p>Name: {profile.name}</p>
//           <p>Email: {profile.email}</p>
//           <p>Contact: {profile.contact}</p>
//           <p>Gender: {profile.gender}</p>
//           <p>Role: {profile.role}</p>
//           <p>Status: {profile.status}</p>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import Header from "../../components/header/header";

const Profile = () => {
  const id = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/profile`)
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
      <Header />
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Text>Email: {profile.email}</Card.Text>
              <Card.Text>Contact: {profile.contact}</Card.Text>
              <Card.Text>Gender: {profile.gender}</Card.Text>
              <Card.Text>Role: {profile.role}</Card.Text>
              <Card.Text>Status: {profile.status}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
