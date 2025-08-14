import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from "../../topnav/supervisor/ss";
import Footer from "../../bottomnav/foter";
import "./updateMonitor.css";

function UpdateMonitor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Location: "",
    Monitoring_Date: "",
    Issues_Found: "",
    Weather_Conditions: "sunny",
    Workers_Present: 0,
    Images: []
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/Monitoring/${id}`);
        const data = res.data.record;
        
        const formatDate = (dateString) => {
          return dateString ? new Date(dateString).toISOString().split('T')[0] : "";
        };

        setInputs({
          ...data,
          Monitoring_Date: formatDate(data.Monitoring_Date)
        });
      } catch (err) {
        toast.error("Failed to load record");
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to update this record?");
    
    if (!isConfirmed) {
      return; // If user cancels, do nothing
    }
    
    try {
      await axios.put(`http://localhost:5000/Monitoring/${id}`, inputs);
      toast.success("Record updated!");
      navigate("/site-supervisor/monitor/view");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="update-monitor-wrapper">
        <div className="update-monitor-form">
          <div className="form-container">
            <h2 className="form-title">Update Monitoring Record</h2>
            
            <form className="monitor-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Project ID</label>
                  <input
                    type="text"
                    name="Project_ID"
                    value={inputs.Project_ID}
                    onChange={handleChange}
                    readOnly
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    name="Project_Name"
                    value={inputs.Project_Name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="Location"
                    value={inputs.Location}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Monitoring Date</label>
                  <input
                    type="date"
                    name="Monitoring_Date"
                    value={inputs.Monitoring_Date}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Issues Found</label>
                <textarea
                  rows="3"
                  name="Issues_Found"
                  value={inputs.Issues_Found}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weather Conditions</label>
                  <select
                    name="Weather_Conditions"
                    value={inputs.Weather_Conditions}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="sunny">Sunny</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="rainy">Rainy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Workers Present</label>
                  <input
                    type="number"
                    name="Workers_Present"
                    value={inputs.Workers_Present}
                    onChange={handleChange}
                    min="0"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Update Record
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateMonitor;