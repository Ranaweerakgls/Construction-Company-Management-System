import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";

function PaymentSuccess() {
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  useEffect(() => {
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    if (paymentDetails) {
      setOrder(paymentDetails.order);
      setAmount(paymentDetails.amount);
      setPaymentDate(new Date().toLocaleDateString());
    }
  }, []);

  //`Payment of LKR. ${amount} for Order ID ${order?.OrderID} was successful!`


  const generatePDF = async () => {
  try {
    // Send SMS first
    await axios.post("http://localhost:5000/api/send-sms", {
      to: "+94764703413",
      message: "A payment for a recently confirmed order was received. CCMS",

    });
    console.log("SMS sent successfully!");
  } catch (smsError) {
    console.error("SMS failed:", smsError);
    alert("Failed to send SMS. Please try again later.");
    return;
  }

  // Generate PDF
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Payment Successful Report", 20, 20);
  doc.setFontSize(12);
  doc.text(`Order ID: ${order?.OrderID}`, 20, 30);
  doc.text(`Order Details: ${order?.ODetails}`, 20, 40);
  doc.text(`Amount Paid (LKR): ${amount}`, 20, 50);
  doc.text(`Payment Date: ${paymentDate}`, 20, 60);
  doc.save("payment_report.pdf");
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.successTitle}>✅ Payment Successful!</h1>
        <p style={styles.subtitle}>
          Thank you for your order. Your payment has been processed successfully.
        </p>

        <div style={styles.infoSection}>
          <p><strong>Order ID:</strong> {order?.OrderID}</p>
          <p><strong>Order Details:</strong> {order?.ODetails}</p>
          <p><strong>Amount Paid:</strong> LKR {amount}</p>
          <p><strong>Payment Date:</strong> {paymentDate}</p>
        </div>

        <button onClick={generatePDF} style={styles.downloadButton}>
          📄 Download Payment Report
        </button>

        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/OrderStatus" style={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "2rem",
  },
  card: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
  },
  successTitle: {
    color: "#28a745",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "2rem",
  },
  infoSection: {
    textAlign: "left",
    marginBottom: "2rem",
    lineHeight: "1.6",
    fontSize: "1rem",
    color: "#333",
  },
  downloadButton: {
    padding: "0.75rem 2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  backLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "500",
    fontSize: "1rem",
  },
};

export default PaymentSuccess;
