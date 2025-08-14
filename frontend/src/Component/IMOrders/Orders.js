import React from 'react';
import OrdersForm from "./OrdersForm";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import { useNavigate } from "react-router-dom";
import background from "../pictures/stock.jpg"
import { MdAssignment, MdLocalShipping, MdHistory } from 'react-icons/md';

function Orders() {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate('/OrderView');
  };

  const handleViewOrder2 = () => {
    navigate('/OrderStatus');
  };

  const handleViewOrder3 = () => {
    navigate('/History');
  };

  const cardStyle = {
    backgroundColor: "#e3f2fd",
    borderRadius: '10px',
    padding: '30px 20px',
    textAlign: 'center',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
    width: '220px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };
  
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <main className="flex-grow-1 container my-4">
  {/* Flex container: Form on left, Cards on right */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '40px',
      flexWrap: 'wrap',
    }}
  >
    {/* Form Container */}
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '600px',
        flex: '1 1 600px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        border: '1px solid #e0e0e0',
      }}
    >
      <OrdersForm />
    </div>

    {/* Card Container */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minWidth: '250px',
      }}
    >
      {/* Card 1 */}
      <div
        onClick={handleViewOrders}
        style={cardStyle}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)'}
      >
        <MdAssignment size={48} color="#1976d2" />
        <h5 style={{ color: '#1976d2', marginTop: '15px' }}>Manage Orders</h5>
        <p style={{ color: '#0d47a1' }}>Cancel or update your order</p>
      </div>

      {/* Card 2 */}
      <div
        onClick={handleViewOrder2}
        style={cardStyle}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)'}
      >
        <MdLocalShipping size={48} color="#0288d1" />
        <h5 style={{ color: '#0288d1', marginTop: '15px' }}>Track Orders</h5>
        <p style={{ color: '#01579b' }}>View current order status</p>
      </div>

      {/* Card 3 */}
      <div
        onClick={handleViewOrder3}
        style={cardStyle}
        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)'}
      >
        <MdHistory size={48} color="#3f51b5" />
        <h5 style={{ color: '#3f51b5', marginTop: '15px' }}>Order History</h5>
        <p style={{ color: '#1a237e' }}>Past orders in one place</p>
      </div>
    </div>
  </div>
</main>


      <Footer />
    </div>
  );
}

export default Orders;
