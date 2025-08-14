import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderTable({ orders = [], setOrders }) {
  const navigate = useNavigate();

  const handleDelete = async (orderId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) {
    return; // User cancelled deletion
  }

  try {
    const response = await axios.delete(`http://localhost:5000/Orders/${orderId}`);
    console.log(response.data.message);
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    window.alert("Item deleted successfully!");
  } catch (error) {
    console.error("Error deleting order:", error);
    window.alert("Failed to delete the item. Please try again.");
  }
};


  return (
    <div >
      

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <thead>
          <tr style={{
            backgroundColor: "#003366",
            color: "#fff",
            textAlign: "left"
          }}>
            <th style={{ padding: "12px" }}>Order Item</th>
            <th style={{ padding: "12px" }}>Quantity</th>
            <th style={{ padding: "12px" }}>Order Type</th>
            <th style={{ padding: "12px" }}>Remarks</th>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Supplier</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <tr key={i} style={{
                backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff"
              }}>
                <td style={{ padding: "12px" }}>{order.Itemname}</td>
                <td style={{ padding: "12px" }}>{order.Quantity}</td>
                <td style={{ padding: "12px" }}>{order.Otype}</td>
                <td style={{ padding: "12px" }}>{order.Remarks}</td>
                <td style={{ padding: "12px" }}>{new Date(order.Date).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{order.Supplier}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => navigate(`/UpdateOrder/${order._id}`)}
                    style={buttonStyle("#28a745")}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={buttonStyle("#dc3545")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Reusable button styling
function buttonStyle(color, extra = {}) {
  return {
    backgroundColor: color,
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    ...extra
  };
}

export default OrderTable;
