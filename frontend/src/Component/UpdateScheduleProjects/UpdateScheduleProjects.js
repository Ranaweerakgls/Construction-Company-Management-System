import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import "./update-project.css";

function UpdateScheduleProjects() {
  const [inputs, setInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ProjectSchedules/pr/${id}`);
        const projectData = response.data.ProjectSchedules || response.data;
        setInputs({
          ...projectData,
          Start_Date: projectData.Start_Date ? new Date(projectData.Start_Date).toISOString().split('T')[0] : "",
          End_Date: projectData.End_Date ? new Date(projectData.End_Date).toISOString().split('T')[0] : ""
        });
      } catch (err) {
        setError("Failed to fetch project details. Please try again.");
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    return await axios.put(`http://localhost:5000/ProjectSchedules/${id}`, {
      Project_Name: String(inputs.Project_Name),
      Project_Location: String(inputs.Project_Location),
      Client_Details: String(inputs.Client_Details),
      Supervisor_Details: String(inputs.Supervisor_Details),
      Start_Date: String(inputs.Start_Date),
      End_Date: String(inputs.End_Date),
    });
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to update this project?");
    if (!isConfirmed) {
      return; // If user clicks cancel, stop the submission
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await sendRequest();
      history('/ScheduleProjectDetails');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-project-container">
      <Header />
      <div className="update-project-form">
        <div className="form-container">
          <h1 className="form-title">Update Project Details</h1>
          
          {error && <div className="error-message">{error}</div>}

          <form className="project-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  name="Project_Name"
                  onChange={handleChange}
                  value={inputs.Project_Name || ""}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Project Location</label>
                <input
                  type="text"
                  name="Project_Location"
                  onChange={handleChange}
                  value={inputs.Project_Location || ""}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Client Details</label>
                <input
                  type="text"
                  name="Client_Details"
                  onChange={handleChange}
                  value={inputs.Client_Details || ""}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Supervisor Details</label>
                <input
                  type="text"
                  name="Supervisor_Details"
                  onChange={handleChange}
                  value={inputs.Supervisor_Details || ""}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="Start_Date"
                  onChange={handleChange}
                  value={inputs.Start_Date || ""}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="End_Date"
                  onChange={handleChange}
                  value={inputs.End_Date || ""}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Project"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateScheduleProjects;