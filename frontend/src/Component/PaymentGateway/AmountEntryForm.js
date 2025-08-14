import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AmountEntryForm() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order; // Optional chaining in case state is undefined

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!amount || isNaN(amount)) return alert("Enter a valid amount");

  // ✅ Save payment details
  localStorage.setItem(
    "paymentDetails",
    JSON.stringify({
      order: order,
      amount: amount,
    })
  );

  // ✅ Mark this specific order as paid
  localStorage.setItem("paidOrder_" + order._id, "true");

  navigate(`/pay/${amount}`);
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>💳 Enter Payment Amount</h2>

        {/* Show order details if available */}
        {order && (
          <div style={styles.orderBox}>
            <p><strong>Order ID:</strong> {order.OrderID}</p>
            <p><strong>Details:</strong> {order.ODetails}</p>
            <p><strong>Date:</strong> {new Date(order.Date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {order.OStatus}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter amount (LKR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #f0f2f5, #c9d6ff)",
    padding: "1rem",
  },
  card: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  orderBox: {
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1.2rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default AmountEntryForm;
