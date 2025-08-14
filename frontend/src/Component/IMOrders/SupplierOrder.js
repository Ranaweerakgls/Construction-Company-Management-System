import React, { useState } from "react";
import axios from "axios";

function SupplierOrder({ orders = [], setOrders }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter((order) =>
    order.Supplier.toLowerCase().includes(searchTerm)
  );

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/Orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      window.alert("You took action on this order");
    } catch (error) {
      console.error("Error deleting order:", error);
      window.alert("Failed to delete the item. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "#0056b3", fontSize: "2.5em", marginBottom: "20px" }}>Pending Orders</h1>

      <input
        type="text"
        placeholder="🔍 Search by Supplier"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "12px",
          width: "50%",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "2px solid #0056b3",
          fontSize: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          outline: "none",
          backgroundColor: "#ffffff",
        }}
        onFocus={(e) => (e.target.style.border = "2px solid #003d7a")}
        onBlur={(e) => (e.target.style.border = "2px solid #0056b3")}
      />

      <div style={{ width: "90%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            minWidth: "900px",
            borderCollapse: "collapse",
            border: "2px solid #0056b3",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
              <th style={styles.th}>Order Item</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Order Type</th>
              <th style={styles.th}>Remarks</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, i) => (
                <tr key={i} style={styles.tr}>
                  <td style={styles.td}>{order.Itemname}</td>
                  <td style={styles.td}>{order.Quantity}</td>
                  <td style={styles.td}>{order.Otype}</td>
                  <td style={styles.td}>{order.Remarks}</td>
                  <td style={styles.td}>{new Date(order.Date).toLocaleDateString()}</td>
                  <td style={styles.td}>{order.Supplier}</td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button
                        onClick={() => handleDelete(order._id)}
                        title="Confirm"
                        style={styles.confirmButton}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        title="Reject"
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "15px", fontStyle: "italic" }}>
                  No matching orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #ccc",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    backgroundColor: "#f9f9f9",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default SupplierOrder;
