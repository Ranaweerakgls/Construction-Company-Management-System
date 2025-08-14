import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import "./UpdateAssignedTask.css";

function UpdateAssignedTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Manager_ID: "",
    PM_Name: "",
    Site_Supervisor_ID: "",
    SS_Name: "",
    Worker_ID: "",
    Deadline: "",
    Priority_Level: "medium",
    Task_Status: "pending"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Tasks/${id}`);
        const taskData = response.data.task;
        
        const formattedDeadline = new Date(taskData.Deadline).toISOString().split('T')[0];
        
        setInputs({
          ...taskData,
          Deadline: formattedDeadline
        });
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error(error.response?.data?.message || "Failed to load task");
        navigate('/AssignedTasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Confirmation dialog before updating
    if (!window.confirm("Are you sure you want to update this task?")) {
      return; // Exit if user clicks "Cancel"
    }

    setLoading(true);
    
    try {
      const response = await axios.put(`http://localhost:5000/Tasks/${id}`, inputs);
      if (response.data.success) {
        toast.success("Task updated successfully!");
        navigate('/AssignedTasks');
      }
    } catch (error) {
      console.error("Error updating task:", error);
      
      if (error.response) {
        if (error.response.data.errors) {
          toast.error(error.response.data.errors.join('\n'));
        } else {
          toast.error(error.response.data.message || "Failed to update task");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="update-task-wrapper">
        <Header />
        <div className="update-task-loading">Loading task data...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="update-task-wrapper">
      <Header />
      <div className="update-task-form">
        <div className="form-container">
          <h1 className="form-title">Update Assigned Task</h1>

          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-row">
              <div className="form-group">
                <label>Project ID</label>
                <input
                  type="text"
                  name="Project_ID"
                  onChange={handleChange}
                  value={inputs.Project_ID}
                  required
                  readOnly
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
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Task'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateAssignedTask;