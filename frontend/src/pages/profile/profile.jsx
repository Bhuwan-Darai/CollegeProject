/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      {userRole === "Accountant" && (
        <>
          <p>Contact: {user.contact}</p>
          {/* Add other accountant-specific details */}
        </>
      )}
      {userRole === "User" && (
        <>
          <p>Admission Number: {user.admissionNumber}</p>
          <p>Semester: {user.semester}</p>
          {/* Add other student-specific details */}
        </>
      )}
    </div>
  );
};

export default Profile;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../../components/header/header";

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     const userRole = localStorage.getItem("userRole");

//     const getProfile = async () => {
//       try {
//         const response = await axios.get(
//           `/getUserProfile/${userId}/${userRole}`,
//         );
//         setUser(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (userId && userRole) {
//       getProfile();
//     }
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <Header />
//       {userRole === "Accountant" && (
//         <>
//           <p>Contact: {user.contact}</p>
//           {/* Add other accountant-specific details */}
//         </>
//       )}
//       {userRole === "User" && (
//         <>
//           <p>Admission Number: {user.admissionNumber}</p>
//           <p>Semester: {user.semester}</p>
//           {/* Add other student-specific details */}
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;
