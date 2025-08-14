import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../pictures/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../nav.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HeadNav() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("User");
  const [userIds, setUserIds] = useState("userids");
  
    useEffect(() => {
      // Retrieve userId from localStorage
      const storedUserId = localStorage.getItem("username");
      const storeuserIds = localStorage.getItem("userids");
      setUserId(storedUserId || "User"); // Fallback to "User" if not found
      setUserIds(storeuserIds);
    }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    if (typeof window.cancelRequest === "function") {
      window.cancelRequest();
    }
    alert("Logged out successfully");
    navigate("/log", { replace: true });
  };

  return (
    <Navbar className="fq-custom-navbar">
      <Container>
        <Navbar.Brand href="/FOhome">
          <img alt="logo" src={logo} className="fq-logo-image" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="fq-navbar-nav">
            <Nav.Link href="/FOhome" className="fq-home">Home</Nav.Link>
            <Nav.Link href="/taskfo" className="fq-task">Task</Nav.Link>
            <Nav.Link href="/BudgetApprove" className="fq-budget">Budget</Nav.Link>
            <Nav.Link href="/Expenses" className="fq-budget">Expenses</Nav.Link>
            {/* <Nav.Link href="/Communicationfo" className="fq-budget">Communication</Nav.Link> */}
          </Nav>

          <Nav className="ms-auto">
            <NavDropdown
              title={
                <div className="fq-user-profile">
                  <span className="fq-username">{userId}</span>
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={`/profile/${userIds}`}>My Account</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeadNav;