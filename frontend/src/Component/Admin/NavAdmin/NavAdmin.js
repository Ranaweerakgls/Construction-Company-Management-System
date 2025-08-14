import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavAdmin.css';

function NavAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login state (e.g., remove token or isLoggedIn flag from localStorage)
    localStorage.removeItem('isLoggedIn');
    // Redirect to login page
    navigate('/log');
  };

  return (
    <nav className="navadmin-container">
      <div className="navadmin-brand">
        <Link to="/admindash" className="navadmin-brand-link">
          Admin Panel
        </Link>
      </div>
      <ul className="navadmin-links">
        <li className="navadmin-item">
          <Link to="/admindash" className="navadmin-link">
            Admin Dashboard
          </Link>
        </li>
        <li className="navadmin-item">
          <Link to="/passworddetails" className="navadmin-link">
            Request
          </Link>
        </li>
        <li className="navadmin-item">
          <Link to="/userdetails" className="navadmin-link">
            Users
          </Link>
        </li>
        <li className="navadmin-item">
          <button onClick={handleLogout} className="navadmin-logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavAdmin;