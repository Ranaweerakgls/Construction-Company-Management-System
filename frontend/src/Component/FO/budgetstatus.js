import React, { useState, useEffect } from "react";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BudgetStatus() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // Fetch all budgets from the backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Budgets");
      console.log("API Response:", response.data);
      const budgetData = response.data.Budgets || response.data || [];
      const budgetArray = Array.isArray(budgetData) ? budgetData : [];
      setBudgets(budgetArray);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  // Update budget status in the backend
  const updateBudgetStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/Budgets/${id}`, { status: newStatus });
      console.log("Update Response:", response.data);
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) =>
          budget._id === id ? { ...budget, status: newStatus } : budget
        )
      );
      setAlert({
        show: true,
        message: `Budget ${newStatus === "Approved" ? "Approved" : "Rejected"} Successfully!`,
        variant: newStatus === "Approved" ? "success" : "danger",
      });
      setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000);
    } catch (error) {
      console.error("Error updating budget status:", error);
      setAlert({
        show: true,
        message: "Failed to Update Budget Status. Please Try Again.",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Function to get status badge variant and style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return { bg: "success", text: "white" };
      case "Rejected":
        return { bg: "danger", text: "white" };
      case "Pending":
      default:
        return { bg: "warning", text: "dark" };
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight:"200vh" }}>
      <Topnav />
      <Container fluid className="mt-5">
        <h2 className="mb-5 text-center" style={{ fontFamily: "'Poppins', sans-serif", color: "#2c3e50", fontWeight: "bold" }}>
          Budget Approval Dashboard
        </h2>
        {loading ? (
          <p className="text-center" style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>Loading budgets...</p>
        ) : budgets.length === 0 ? (
          <p className="text-center" style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>No budgets available.</p>
        ) : (
          <Row className="justify-content-center">
            {budgets.map((budget) => (
              <Col md={4} key={budget._id} className="mb-4">
                <Card
                  className="shadow-lg border-0 h-100"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    background: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                  }}
                >
                  <Badge
                    bg={getStatusStyle(budget.status).bg}
                    text={getStatusStyle(budget.status).text}
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      fontSize: "0.9rem",
                      padding: "0.5em 1em",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {budget.status || "Pending"}
                  </Badge>

                  <div
                    style={{
                      background: "linear-gradient(45deg, #3498db, #8e44ad)",
                      height: "80px",
                      borderRadius: "15px 15px 0 0",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    <h5 className="text-white mb-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {budget.Name}
                    </h5>
                  </div>

                  <Card.Body className="p-4">
                    <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: "0.9rem" }}>
                      P_ID: {budget.P_ID}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: "1rem", color: "#34495e" }}>
                      <strong>Location:</strong> {budget.location || "N/A"} <br />
                      <strong>Amount:</strong> Rs {Number(budget.amount).toLocaleString()} <br />
                      <strong>Date:</strong> {new Date(budget.createdDate).toLocaleDateString()} <br />
                      <strong>Description:</strong> <span style={{ color: "#7f8c8d" }}>{budget.description || "No description provided"}</span>
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        variant="outline-success"
                        onClick={() => updateBudgetStatus(budget._id, "Approved")}
                        disabled={budget.status === "Approved" || budget.status === "Rejected"}
                        style={{
                          borderRadius: "25px",
                          padding: "0.5rem 1.5rem",
                          fontWeight: "bold",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (budget.status !== "Approved" && budget.status !== "Rejected") {
                            e.target.style.backgroundColor = "#28a745";
                            e.target.style.color = "white";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (budget.status !== "Approved" && budget.status !== "Rejected") {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#28a745";
                          }
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => updateBudgetStatus(budget._id, "Rejected")}
                        disabled={budget.status === "Approved" || budget.status === "Rejected"}
                        style={{
                          borderRadius: "25px",
                          padding: "0.5rem 1.5rem",
                          fontWeight: "bold",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (budget.status !== "Approved" && budget.status !== "Rejected") {
                            e.target.style.backgroundColor = "#dc3545";
                            e.target.style.color = "white";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (budget.status !== "Approved" && budget.status !== "Rejected") {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#dc3545";
                          }
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      

      {/* Full-Screen Alert */}
      {alert.show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050, // Above other content
          }}
        >
          <Alert
            variant={alert.variant}
            style={{
              maxWidth: "500px",
              width: "90%",
              padding: "2rem",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
              fontSize: "1.5rem",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
            }}
          >
            {alert.message}
            <Button
              variant="light"
              onClick={() => setAlert({ show: false, message: "", variant: "" })}
              style={{
                marginTop: "1rem",
                borderRadius: "25px",
                padding: "0.5rem 2rem",
                fontWeight: "bold",
              }}
            >
              Close
            </Button>
          </Alert>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        .card:hover {
          cursor: pointer;
        }
      `}</style>
      <Fot />
    </div>
  );
}

export default BudgetStatus;