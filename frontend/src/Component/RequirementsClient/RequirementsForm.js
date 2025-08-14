import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic5 from '../pictures/pic5.jpg';

function RequirementsForm() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Client_Name: "",
    Project_Name: "",
    Contact_Number: "",
    Email: "",
    Requirements_Type: "",
    Date: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert('Progress record successfully added!');
      navigate('/Client');
    } catch (error) {
      console.error("Error submitting data:", error);
      alert('Failed to add progress record.');
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/requiments", {
      Client_Name: String(inputs.Client_Name),
      Project_Name: String(inputs.Project_Name),
      Contact_Number: String(inputs.Contact_Number),
      Email: String(inputs.Email),
      Requirements_Type: String(inputs.Requirements_Type),
      Date: inputs.Date ? new Date(inputs.Date).toISOString() : null,
    });
  };

  const backgroundStyle = {
    backgroundImage: `url(${pic5})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  };

  return (
    <div style={backgroundStyle}>
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-300" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Submit New Requirements</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Client_Name" className="form-label">Client Name</label>
            <input
              type="text"
              id="Client_Name"
              name="Client_Name"
              value={inputs.Client_Name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter client name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Project_Name" className="form-label">Project Name</label>
            <input
              type="text"
              id="Project_Name"
              name="Project_Name"
              value={inputs.Project_Name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Contact_Number" className="form-label">Contact Number</label>
            <input
              type="text"
              id="Contact_Number"
              name="Contact_Number"
              value={inputs.Contact_Number}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={inputs.Email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Requirements_Type" className="form-label">Requirements Type</label>
            <select
              id="Requirements_Type"
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
            <label htmlFor="Date" className="form-label">Date</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={inputs.Date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequirementsForm;
