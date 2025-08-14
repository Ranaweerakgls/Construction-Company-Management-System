import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../pictures/logo.png";
import "../topnav/Header.css";

function SiteSupervisorNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/site-supervisor">
          <img alt="logo" src={logo} className="logo-image" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/site-supervisor">Home</Nav.Link>
            <Nav.Link as={Link} to="/site-supervisor/monitor/view">Monitoring</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteSupervisorNavbar;