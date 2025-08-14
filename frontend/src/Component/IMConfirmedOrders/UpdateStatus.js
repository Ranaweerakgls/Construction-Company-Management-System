import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // Icon for the loading spinner

const URL = "http://localhost:5000/ConfirmedOrders";

function UpdateStatus() {
  const { id } = useParams(); // Get Order ID from URL
  const navigate = useNavigate();
  const [status, setStatus] = useState(""); // Order Status State
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        // Assuming the response contains OStatus
        setStatus(response.data.OStatus || ""); // Set status, default to empty if not found
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load order status.");
        setLoading(false); // Set loading to false even if there is an error
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${URL}/${id}`, { OStatus: status }) // Update only the status
      .then(() => {
        alert("Order status updated!");
        navigate("/TableView"); // Redirect back to order list
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update status");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`${URL}/${id}`)
        .then(() => {
          alert("Order deleted successfully!");
          navigate("/TableView"); // Redirect back to order list after deletion
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
          alert("Failed to delete order");
        });
    }
  };

  // Show loading or error message if data is still loading or error occurred
  if (loading) {
    return (
      <div className="text-center my-5">
        <FaSpinner className="fa-spin" size={40} />
        <h5>Loading...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#0056b3" }}>
        Update Order Status
      </h2>

      <div className="card shadow-lg p-4">
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Order Status:</label>
            <select
              className="form-select form-select-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                border: "1px solid #007bff",
                boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
              }}
            >
              <option value="">Select Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary btn-lg px-5"
              style={{
                backgroundColor: "#0056b3",
                borderColor: "#0056b3",
              }}
            >
              <i className="bi bi-check-circle"></i> Update Status
            </button>
          </div>

          {/* Always show Delete button */}
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-danger btn-lg px-5"
              onClick={handleDelete}
            >
              <i className="bi bi-trash"></i> Delete Order
            </button>
          </div>

          {/* Instruction paragraph for deleting */}
          <div className="text-center mt-3">
            <p className="text-muted">
              If you wish to delete this order, please confirm by clicking the
              "Delete Order" button. This action cannot be undone.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStatus;
