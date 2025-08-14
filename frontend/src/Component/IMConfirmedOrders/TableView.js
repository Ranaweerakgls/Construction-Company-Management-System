import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import RecordTable from './RecordTable';
import HeaderSup from "../topnav/Supplier/HeaderSup";
import Footer from "../bottomnav/IM/Footer";
import background from '../pictures/stock.jpg';

function TableView() {
  /* ---------- background + overlay ---------- */
  const tableViewStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: -1,
  };

  /* ---------- notification-button styling (no absolute!) ---------- */
  const notificationButtonStyle = {
    backgroundColor: '#ffffffcc',
    padding: '10px 14px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  };

  return (
    <div style={tableViewStyle}>
      <div style={overlayStyle}></div>

      {/* top navigation */}
      <HeaderSup />

      {/* main content */}
      <main className="container my-4">
        <RecordTable />
      </main>

      <Footer />
    </div>
  );
}

export default TableView;
