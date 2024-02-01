import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // object for path to brand mappings
  const pathToBrandMap = {
    "/dashboard": "Dashboard",
    "/students": "Students",
    "/CreateStudent": "Create Student",
    "/accountant": "Accountant",
    "/CreateAccountant": "Create Accountant",
    "/payment": "Payment",
    "/feeStructure": "Fee Structure ",
    "/statements": "Statements",
    "/statements/statementDetails": "Statements",
    "/invoice": "Invoice",
    "/profile": "Profile",
    "/feeStructure/CreateFee": "Create Fee Structure",
    "/sendMail": " Mail",
  };

  //    now extract the dynamic value from the pathToBrandMap

  const dynamicPath = pathToBrandMap[location.pathname];

  const [showDropdown, setShowDropdown] = useState(false); // Provide an initial value

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const profile = () => {
    navigate("/profile");
  };
  const logout = () => {
    navigate("/");
  };
  return (
    <header>
      <Navbar
        expand="md"
        collapseOnSelect
        style={{ borderRadius: "5px", background: "#224952" }}
      >
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            {dynamicPath}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav style={{ marginLeft: "93%" }}>
              <NavDropdown
                show={showDropdown}
                onToggle={toggleDropdown}
                title={<BsIcons.BsFillPersonFill style={{ color: "white" }} />}
                id="dropdown-menu"
              >
                <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
