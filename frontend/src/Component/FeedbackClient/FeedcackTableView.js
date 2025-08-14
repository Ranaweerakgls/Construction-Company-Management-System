import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import pic4 from "../pictures/pic4.jpg";

const URL = "http://localhost:5000/feedback";

function FeedbackView() {
  const [feedbackusers, setfeedbackusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        if (response.data.feedbackusers) {
          setfeedbackusers(response.data.feedbackusers);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${URL}/${id}`);
      setfeedbackusers((prev) => prev.filter((user) => user._id !== id));
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete the feedback.");
    }
  };

  const styles = {
    page: {
      backgroundImage: `url(${pic4})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      padding: "20px 0",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    },
    title: {
      textAlign: "center",
      color: "#2c3e50",
      fontSize: "2.5rem",
      marginBottom: "30px",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    card: {
      width: "300px",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      transformStyle: "preserve-3d",
      border: "2px solid #3498db",
      backgroundImage: "linear-gradient(135deg, #e0f7fa, #ffffff)",
    },
    cardHover: {
      transform: "translateY(-10px) scale(1.03)",
      boxShadow: "0 25px 40px rgba(0, 0, 0, 0.25)",
    },
    feedbackText: {
      fontSize: "1rem",
      marginBottom: "10px",
      color: "#333",
    },
    dateText: {
      fontSize: "0.9rem",
      color: "#777",
      marginBottom: "15px",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      padding: "8px 12px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      backgroundColor: "#e74c3c",
      transition: "background-color 0.2s ease",
    },
  };

  return (
    <div>
      <Header />
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Feedback Records</h1>
          <div style={styles.cardContainer}>
            {feedbackusers.length > 0 ? (
              feedbackusers.map((user) => (
                <div
                  key={user._id}
                  style={styles.card}
                  onMouseEnter={(e) => {
                    Object.assign(
                      e.currentTarget.style,
                      styles.card,
                      styles.cardHover
                    );
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, styles.card);
                  }}
                >
                  <div style={styles.feedbackText}>{user.feedback}</div>
                  <div style={styles.dateText}>
                    {new Date(user.Date).toLocaleDateString()}
                  </div>
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.button}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%", color: "#444" }}>
                No Feedbacks found
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FeedbackView;
