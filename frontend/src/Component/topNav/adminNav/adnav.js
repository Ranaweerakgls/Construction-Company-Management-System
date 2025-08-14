import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../pictures/logo.png";
import "./adnav.css";

function Adnav({ username, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/QShome" className="navbar-brand">
          <img src={logo} alt="logo" className="logo-image" />
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/QShome" className="nav-link">
            Home
          </Link>
          <Link to="/task" className="nav-link">
            Task
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="user-section">
          <div className="user-profile" onClick={toggleDropdown}>
            <span className="username">{username || "User"}</span>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/account" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                My Account
              </Link>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={toggleDropdown}>
          <span className="menu-icon">&#9776;</span>
        </div>
      </div>
    </nav>
  );
}

export default Adnav;