import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./assignTask.css";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";

function AssignTask() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Manager_ID: "",
    PM_Name: "",
    Worker_ID: "",
    Deadline: "",
    Priority_Level: "medium",
    Task_Status: "pending",
    Description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const areAllFieldsFilled = () => {
    return (
      inputs.Project_ID &&
      inputs.Project_Manager_ID &&
      inputs.PM_Name &&
      inputs.Worker_ID &&
      inputs.Deadline &&
      inputs.Description
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!areAllFieldsFilled()) {
      toast.error("Please fill all required fields");
      return;
    }

    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to assign this task?");
    if (!isConfirmed) {
      return; // User clicked cancel
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/Tasks", inputs);
      if (response.data.success) {
        toast.success("Task assigned successfully!");
        history("/AssignedTasks");
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      if (error.response) {
        if (error.response.data.missingFields) {
          toast.error(
            `Missing required fields: ${error.response.data.missingFields.join(", ")}`
          );
        } else if (error.response.data.errors) {
          toast.error(error.response.data.errors.join("\n"));
        } else {
          toast.error(error.response.data.message || "Failed to assign task");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="assign-task-form">
        <div className="form-container">
          <h1 className="form-title">Assign New Task</h1>
          
          <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Project ID</label>
                <input
                  type="text"
                  name="Project_ID"
                  onChange={handleChange}
                  value={inputs.Project_ID}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Project Manager ID</label>
                <input
                  type="text"
                  name="Project_Manager_ID"
                  onChange={handleChange}
                  value={inputs.Project_Manager_ID}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>PM Name</label>
                <input
                  type="text"
                  name="PM_Name"
                  onChange={handleChange}
                  value={inputs.PM_Name}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Worker ID</label>
                <input
                  type="text"
                  name="Worker_ID"
                  onChange={handleChange}
                  value={inputs.Worker_ID}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Task Deadline</label>
                <input
                  type="date"
                  name="Deadline"
                  onChange={handleChange}
                  value={inputs.Deadline}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Priority Level</label>
                <select
                  name="Priority_Level"
                  onChange={handleChange}
                  value={inputs.Priority_Level}
                  className="input-field"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Task Status</label>
              <select
                name="Task_Status"
                onChange={handleChange}
                value={inputs.Task_Status}
                className="input-field"
              >
                <option value="pending">Pending</option>
                
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                  type="text"
                  name="Description"
                  onChange={handleChange}
                  value={inputs.Description}
                  required
                  className="input-field"
                />
            </div>
            <button 
              type="submit" 
              className={`submit-btn ${!areAllFieldsFilled() ? 'disabled-btn' : ''}`}
              disabled={loading || !areAllFieldsFilled()}
            >
              {loading ? 'Assigning...' : 'Assign Task'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AssignTask;