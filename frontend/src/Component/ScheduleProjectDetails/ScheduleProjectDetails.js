import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import "./ScheduleProjectDetails.css";

function ScheduleProjectDetails() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/ProjectSchedules", { signal });
      
      const receivedProjects = Array.isArray(res.data?.ProjectSchedules) 
        ? res.data.ProjectSchedules 
        : [];
      
      setProjects(receivedProjects);
      setFilteredProjects(receivedProjects);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch projects. Please try again.");
        toast.error("Failed to fetch projects");
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
      setFilteredProjects(projects);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = projects.filter(project => {
        return (
          (project.Project_Name?.toLowerCase().includes(searchTermLower)) ||
          (project.Project_Location?.toLowerCase().includes(searchTermLower)) ||
          (project.Client_Details?.toLowerCase().includes(searchTermLower)) ||
          (project.Supervisor_Details?.toLowerCase().includes(searchTermLower))
        );
      });
      setFilteredProjects(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, projects]);
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/ProjectSchedules/${id}`);
      toast.success("Project deleted successfully!");
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
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="projects-page-wrapper">
        <div className="loading-spinner">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page-wrapper">
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
    <div className="projects-page-wrapper">
      <Header />
      <div className="projects-container">
        <div className="projects-header">
          <div className="projects-controls">
            <input
              type="text"
              placeholder="Search projects by name, location, client, or supervisor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button" disabled={loading}>
              <FaSearch />
            </button>
          </div>
          <h1 className="projects-title">Scheduled Projects</h1>
          <div className="projects-buttons">
            <button 
              className="add-project-button"
              onClick={() => navigate("/AddProjectDetails")}
              disabled={loading}
            >
              <FaPlus className="button-icon" />
              New Project
            </button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            {projects.length === 0 
              ? "No scheduled projects found. Create your first project!" 
              : "No projects match your search criteria"}
          </div>
        ) : (
          <>
            <div className="projects-table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Project Location</th>
                    <th>Client Details</th>
                    <th>Supervisor Details</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project) => (
                    <tr key={project._id}>
                      <td>{project.Project_ID || "N/A"}</td>
                      <td>{project.Project_Name || "N/A"}</td>
                      <td>{project.Project_Location || "N/A"}</td>
                      <td>{project.Client_Details || "N/A"}</td>
                      <td>{project.Supervisor_Details || "N/A"}</td>
                      <td>{formatDate(project.Start_Date)}</td>
                      <td>{formatDate(project.End_Date)}</td>
                      <td>
                        <div className="action-buttons-container">
                          <button 
                            className="action-button update"
                            onClick={() => navigate(`/ScheduleProjectDetails/${project._id}`)}
                          >
                            Update
                          </button>
                          <button 
                            className="action-button delete"
                            onClick={() => handleDelete(project._id)}
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

export default ScheduleProjectDetails;