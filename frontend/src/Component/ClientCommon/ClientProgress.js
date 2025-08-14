import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/ClientNav/HeaderClient";
import Footer from "../bottomnav/foter";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import pic5 from "../pictures/pic5.jpg";

const URL = "http://localhost:5000/progress";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { Progressusers: [] };
  }
};

function Users() {
  const [p001Users, setP001Users] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data.Progressusers) {
        const filtered = data.Progressusers.filter(
          (user) => user.Project_ID === "P001"
        );
        setP001Users(filtered);
      }
    });
  }, []);

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Progress Report - Project P001", 14, 15);

    const tableColumn = [
      "Project Name",
      "Description",
      "Duration",
      "Date",
      "Status",
      "Completion %",
    ];
    const tableRows = [];

    p001Users.forEach((user) => {
      tableRows.push([
        user.Project_Name,
        user.Description,
        user.Duration,
        user.Date,
        user.Status,
        `${user.Completion_Percentage || 0}%`,
      ]);
    });

    const startX = 14;
    let startY = 30;

    tableColumn.forEach((col, i) => {
      doc.text(col, startX + i * 40, startY);
    });

    startY += 10;

    tableRows.forEach((row) => {
      row.forEach((col, i) => {
        doc.text(col, startX + i * 40, startY);
      });
      startY += 10;
    });

    doc.save("progress-report.pdf");
  };

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `url(${pic5})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "100vh",
          paddingTop: "60px",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            padding: "40px",
            maxWidth: "1400px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Current Status of Your Project
          </h2>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={generatePDFReport}
              style={{
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
            >
              Download Full Progress Report as PDF
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {p001Users.length > 0 ? (
              p001Users.map((user, index) => (
                <div
                  key={index}
                  style={{
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    background: "linear-gradient(145deg, #f5f7fa, #c3cfe2)",
                    padding: "30px",
                    margin: "20px",
                    width: "400px",
                    height: "500px",
                    textAlign: "left",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 18px 36px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                  }}
                >
                  {user.Image ? (
                    <img
                      src={`http://localhost:5000/progressuploads/${user.Image}`}
                      alt="Project"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                        marginBottom: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#888",
                      }}
                    >
                      No Image
                    </div>
                  )}

                  <h3 style={{ color: "#333", fontSize: "24px" }}>
                    {user.Project_Name}
                  </h3>
                  <p>
                    <strong>Description:</strong> {user.Description}
                  </p>
                  <p>
                    <strong>Duration:</strong> {user.Duration}
                  </p>
                  <p>
                    <strong>Date:</strong> {user.Date}
                  </p>
                  <p>
                    <strong>Status:</strong> {user.Status}
                  </p>

                  <div
                    style={{
                      backgroundColor: "#e0e0e0",
                      borderRadius: "6px",
                      height: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: `${user.Completion_Percentage || 0}%`,
                        backgroundColor: "#4caf50",
                        height: "100%",
                        borderRadius: "6px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "12px",
                        lineHeight: "20px",
                      }}
                    >
                      {user.Completion_Percentage || 0}%
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "#333" }}>
                No progress records found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Users;
