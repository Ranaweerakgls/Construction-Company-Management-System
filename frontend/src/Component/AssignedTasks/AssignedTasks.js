import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaSearch, 
  FaPlus,
  FaExclamationTriangle 
} from 'react-icons/fa';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import "./AssignedTasks.css";

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/Tasks", { signal });
      
      const receivedTasks = Array.isArray(res.data?.tasks) ? res.data.tasks : [];
      
      setTasks(receivedTasks);
      setFilteredTasks(receivedTasks);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch tasks. Please try again.");
        toast.error("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchData();
    
    if (location.state?.success) {
      toast.success(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [fetchData, location, navigate]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = tasks.filter(task => {
        return (
          (task.Project_ID?.toLowerCase().includes(searchTermLower)) ||
          (task.Project_Manager_ID?.toLowerCase().includes(searchTermLower)) ||
          (task.PM_Name?.toLowerCase().includes(searchTermLower)) ||
          (task.Site_Supervisor_ID?.toLowerCase().includes(searchTermLower)) ||
          (task.SS_Name?.toLowerCase().includes(searchTermLower)) ||
          (task.Worker_ID?.toLowerCase().includes(searchTermLower)) ||
          (task.Priority_Level?.toLowerCase().includes(searchTermLower)) ||
          (task.Task_Status?.toLowerCase().includes(searchTermLower))
        );
      });
      setFilteredTasks(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, tasks]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/Tasks/${id}`);
      toast.success("Task deleted successfully!");
      await fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPriorityClass = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'in progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="tasks-page-wrapper">
        <div className="loading-spinner">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-page-wrapper">
        <div className="error-alert">
          <FaExclamationTriangle className="error-icon" />
          <div>
            <h5>Error Loading Data</h5>
            <p>{error}</p>
            <button className="retry-button" onClick={fetchData}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page-wrapper">
      <Header />
      <div className="tasks-container">
        <div className="tasks-header">
          <div className="tasks-controls">
            <input
              type="text"
              placeholder="Search tasks by project, PM, supervisor, worker, priority or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button" disabled={loading}>
              <FaSearch />
            </button>
          </div>
          <h1 className="tasks-title">Assigned Tasks</h1>
          <div className="tasks-buttons">
            <button 
              className="add-task-button"
              onClick={() => navigate("/AssignTask")}
              disabled={loading}
            >
              <FaPlus className="button-icon" />
              Assign New Task
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="no-tasks">
            {tasks.length === 0 
              ? "No tasks found. Assign your first task!" 
              : "No tasks match your search criteria"}
          </div>
        ) : (
          <>
            <div className="tasks-table-container">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>PM ID</th>
                    <th>PM Name</th>
                    <th>Worker ID</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.Project_ID || "N/A"}</td>
                      <td>{task.Project_Manager_ID || "N/A"}</td>
                      <td>{task.PM_Name || "N/A"}</td>
                      <td>{task.Worker_ID || "N/A"}</td>
                      <td>{formatDate(task.Deadline)}</td>
                      <td className={getPriorityClass(task.Priority_Level)}>
                        {task.Priority_Level || "N/A"}
                      </td>
                      <td className={getStatusClass(task.Task_Status)}>
                        {task.Task_Status || "N/A"}
                      </td>
                      <td>
                        <div className="action-buttons-container">
                          <button 
                            className="action-button update"
                            onClick={() => navigate(`/UpdateAssignedTask/${task._id}`)}
                          >
                            Update
                          </button>
                          <button 
                            className="action-button delete"
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-button prev"
                  onClick={() => paginate(Math.max(1, currentPage - 1))} 
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {[...Array(totalPages).keys()].map(number => (
                  <button
                    key={number + 1}
                    className={`page-button ${number + 1 === currentPage ? 'active' : ''}`}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                ))}
                <button 
                  className="page-button next"
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))} 
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AssignedTasks;