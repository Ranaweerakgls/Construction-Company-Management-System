import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentPage() {
  const { amount } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/payments/create-payment-intent", { amount })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error(err));
  }, [amount]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const cardElement = elements.getElement(CardElement);

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: "Test Customer",
        address: {
          line1: "123 Test Street",
          city: "Colombo",
          country: "LK",
          postal_code: "10100",
        },
      },
    },
  });
if (error) {
    console.error(error);
    alert("Payment failed");
    return; // Exit early if payment fails
  }
  navigate("/PaymentSuccess");
};



  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Secure Payment</h2>
        <p style={styles.subheading}>You are paying <strong>Rs. {amount}</strong></p>
        <form onSubmit={handleSubmit}>
          <div style={styles.cardInput}>
            <CardElement options={cardStyle} />
          </div>
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            style={styles.button}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "420px",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#0d47a1",
  },
  subheading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#555",
  },
  cardInput: {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    backgroundColor: "#fafafa",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

// Optional Card Element styles
const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#c23d4b",
    },
  },
};

export default PaymentPage;
