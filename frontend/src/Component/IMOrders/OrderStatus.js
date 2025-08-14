import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaExclamationTriangle, FaWallet } from "react-icons/fa"; // Import the wallet icon
import background from '../pictures/stock.jpg';

const URL = "http://localhost:5000/ConfirmedOrders"; // API Endpoint

function ReadOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "processing":
      return { backgroundColor: "#e6fff5" }; // Soft green
    case "shipped":
      return { backgroundColor: "#fffbe6" }; // Soft yellow
    case "delivered":
      return { backgroundColor: "#ffe6e6" }; // Soft red
    case "confirmed":
      return { backgroundColor: "#e6ecff" }; // Soft blue
    default:
      return {};
  }
};



  const [paidOrders, setPaidOrders] = useState([]);

  const handlePayClick = (order) => {
  setPaidOrders((prev) => [...prev, order._id]); // Mark order as paid
  navigate("/AmountEntryForm", { state: { order } }); // Still navigate to payment form
};


  // Fetch Data
  useEffect(() => {
  axios
    .get(URL)
    .then((response) => {
      const records = response.data.records;

      // Check localStorage for each order's paid status
      const paid = records
        .filter(order => localStorage.getItem("paidOrder_" + order._id) === "true")
        .map(order => order._id);

      setOrders(records);
      setPaidOrders(paid);
    })
    .catch((error) => console.error("Error fetching orders:", error));
}, []);


  return (
    <div>
  <Header />
  <div
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      paddingTop: "20px",
      paddingBottom: "30px",
    }}
  >
    <div
      className="container my-5"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(5px)",
      }}
    >
      <h3 className="text-center mb-4 fw-bold text-primary">Confirmed Orders</h3>
      <table
        className="table table-hover table-bordered"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#003366", color: "#fff" }}>
            <th>Order ID</th>
            <th>Details</th>
            <th>Date</th>
            <th>Bill</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} style={getStatusStyle(order.OStatus)}>
                <td>{order.OrderID}</td>
                <td>{order.ODetails}</td>
                <td>{new Date(order.Date).toLocaleDateString()}</td>
                <td>
                  {order.imagePaths && order.imagePaths.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {order.imagePaths.map((imgPath, index) => (
                        <img
                          key={index}
                          src={`http://localhost:5000${imgPath}`}
                          alt={`order-${order._id}-${index}`}
                          style={{
                            height: "60px",
                            width: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onClick={() =>
                            window.open(`http://localhost:5000${imgPath}`, "_blank")
                          }
                          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted">No images</span>
                  )}
                </td>
                <td >{order.OStatus}</td>
                <td>
                  {paidOrders.includes(order._id) ? (
                    <span
                      className="badge bg-success"
                      style={{ fontSize: "0.9rem", padding: "0.5em 1em" }}
                    >
                      ✅ Paid
                    </span>
                  ) : (
                    <button
                      className="btn btn-sm"
                      onClick={() => handlePayClick(order)}
                      style={{
                        background: "linear-gradient(135deg, #007bff, #0056b3)",
                        border: "none",
                        borderRadius: "5px",
                        padding: "8px 16px",
                        fontSize: "14px",
                        color: "white",
                        fontWeight: "bold",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#004999")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "linear-gradient(135deg, #007bff, #0056b3)")
                      }
                    >
                      <FaWallet /> Pay
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                <FaExclamationTriangle className="me-2" />
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  <Footer />
</div>

  );
}

export default ReadOrders;
