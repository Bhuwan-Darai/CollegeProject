import "./logout.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/header/header";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    axios.post("/logout");
    setTimeout(() => {
      navigate("/");
    });
  };
  return (
    /* <Header/>*/
    <div className="logout-container">
      <h5>Are you sure you want to logout?</h5>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <Button onClick={handleClick}>Logout</Button>
        <Button style={{ marginLeft: "8px" }}>
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Cancel
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Logout;
