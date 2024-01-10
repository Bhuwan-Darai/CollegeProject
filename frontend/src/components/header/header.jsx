import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // object for path to brand mappings
  const pathToBrandMap = {
    "/dashboard": "Dashboard",
    "/students": "Students",
    "/CreateStudent": "Create Student",
    "/account": "Accountant",
    "/payment": "Payment",
    "/feeStructure": "Fee Structure ",
    "/statements": "Statements",
    "/statements/seeDetails": "Statements",
    "/invoice": "Invoice",
    "/logout": "Logout",
    "/feeStructure/CreateFee": "Create Fee Structure",
    "/sendMail": " Mail",
  };

  //    now extract the dynamic value from the pathToBrandMap

  const dynamicPath = pathToBrandMap[location.pathname];

  const [showDropdown, setShowDropdown] = useState(false); // Provide an initial value

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">{dynamicPath}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav style={{ marginLeft: "90%" }}>
              <NavDropdown
                show={showDropdown}
                onToggle={toggleDropdown}
                title={<BsIcons.BsFillPersonFill />}
                id="dropdown-menu"
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
