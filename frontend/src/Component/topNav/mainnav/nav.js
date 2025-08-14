import React from "react";
import Logo from "../../pictures/logo.png";
import { Link } from "react-router-dom";
import "./nav1.css";

function HeadNav() {
  return (
    <nav className="head-custom-navbar">
      <div className="head-nav-container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Logo" className="head-logo-image" />
        </Link>

        <div className="head-navbar-nav">
          <Link to="/mainhome" className="head-nav-link">Home</Link>
          <Link to="/contact" className="head-nav-link">Contact Us</Link>
          <Link to="/about" className="head-nav-link">About US</Link>
          <Link to="/service" className="head-nav-link">Services</Link>
        </div>

        <div className="head-nav-actions">
          <Link to="/log" className="head-nav-link head-login-btn">Log In</Link>
        </div>
      </div>
    </nav>
  );
}

export default HeadNav;