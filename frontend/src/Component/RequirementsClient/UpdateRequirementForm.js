import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import pic4 from "../pictures/pic4.jpg";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";

function UpdateRequirementForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Client_Name: "",
    Project_Name: "",
    Contact_Number: "",
    Email: "",
    Requirements_Type: "",
    Date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/requiments/${id}`)
      .then((res) => {
        const data = res.data.user || res.data;
        setInputs({
          Client_Name: data.Client_Name || "",
          Project_Name: data.Project_Name || "",
          Contact_Number: data.Contact_Number || "",
          Email: data.Email || "",
          Requirements_Type: data.Requirements_Type || "",
          Date: data.Date
            ? new Date(data.Date).toISOString().split("T")[0]
            : "",
        });
      })
      .catch((error) => {
        console.error("Error fetching requirement details:", error);
        alert("Failed to load data.");
      });
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/requiments/${id}`, inputs);
      alert("Requirement updated successfully!");
      navigate("/requirements");
    } catch (error) {
      console.error("Error updating requirement:", error);
      alert("Failed to update requirement.");
    }
  };

  return (
    <div>
      <Header />
      <div
        className="container-fluid py-5"
        style={{
          backgroundImage: `url(${pic4})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          className="bg-white p-4 shadow rounded-lg border border-gray-300"
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <h2 className="text-center text-primary mb-4">Update Requirement</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Client Name</label>
              <input
                type="text"
                name="Client_Name"
                value={inputs.Client_Name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                name="Project_Name"
                value={inputs.Project_Name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                name="Contact_Number"
                value={inputs.Contact_Number}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="Email"
                value={inputs.Email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Requirements Type</label>
              <select
                name="Requirements_Type"
                value={inputs.Requirements_Type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Requirement</option>
                <option value="confirmed">Confirmed</option>
                <option value="On Progress">On Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="Date"
                value={inputs.Date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Update Requirement
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateRequirementForm;
