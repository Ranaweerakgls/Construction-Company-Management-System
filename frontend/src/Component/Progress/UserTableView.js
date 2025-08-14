import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersTable from "./UsersTable";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import pic4 from "../pictures/pic4.jpg";

const URL = "http://localhost:5000/progress";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
};

function Users() {
  const [Progressusers, setProgressusers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      if (Array.isArray(data)) {
        setProgressusers(data);
      } else if (Array.isArray(data.Progressusers)) {
        setProgressusers(data.Progressusers);
      } else {
        setProgressusers([]);
      }
    });
  }, []);

  const pageStyle = {
    backgroundImage: `url(${pic4})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    paddingBottom: "4rem",
  };

  const topBarStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "1rem 2rem",
  };

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={pageStyle}>
      <Header />
      <div style={topBarStyle}>
        <button
          style={buttonStyle}
          onClick={() => navigate("/Progress")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
        >
          ➕ Add new Progress record
        </button>
      </div>
      <UsersTable Progressusers={Progressusers} />
      <Footer />
    </div>
  );
}

export default Users;
