import React, { useEffect, useState } from "react";
import axios from "axios";
import RequirementsTable from "./RequirementsTable";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import pic4 from "../pictures/pic4.jpg"; // Make sure the path and image exist

const URL = "http://localhost:5000/requiments"; // Ensure this matches your backend route

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    if (response.data.Requirementusers) {
      return response.data;
    } else {
      throw new Error("Invalid data structure from API");
    }
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return { Requirementusers: [] };
  }
};

function Requirements() {
  const [Requirementusers, setRequirementusers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setRequirementusers(data.Requirementusers));
  }, []);

  const pageStyle = {
    backgroundImage: `url(${pic4})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    paddingBottom: "4rem",
  };

  return (
    <div style={pageStyle}>
      <Header />
      <h1 style={{
        textAlign: "center",
        padding: "1.5rem",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)"
      }}>
        Requirements Record
      </h1>
      <RequirementsTable Requirementusers={Requirementusers} />
      <Footer />
    </div>
  );
}

export default Requirements;
