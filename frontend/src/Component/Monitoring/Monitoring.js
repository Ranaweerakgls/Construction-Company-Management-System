import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaSearch, 
  FaPlus, 
  FaCloudSun, 
  FaCloudRain, 
  FaSun, 
  FaExclamationTriangle 
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import "./Monitoring.css";

function Monitoring() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/Monitoring", { signal });
      
      const receivedRecords = Array.isArray(res.data) 
        ? res.data 
        : Array.isArray(res.data?.records) 
          ? res.data.records 
          : [];
      
      setRecords(receivedRecords);
      setFilteredRecords(receivedRecords);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch records. Please try again.");
        toast.error("Failed to fetch records");
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
      setFilteredRecords(records);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = records.filter(record => {
        return (
          (record.Project_Name?.toLowerCase().includes(searchTermLower)) ||
          (record.Location?.toLowerCase().includes(searchTermLower)) ||
          (record.Issues_Found?.toLowerCase().includes(searchTermLower)) ||
          (record.Project_ID?.toLowerCase().includes(searchTermLower))
        );
      });
      setFilteredRecords(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, records]);

  const getWeatherIcon = (weather) => {
    if (!weather) return <FaCloudSun className="weather-icon" />;
    
    switch(weather.toLowerCase()) {
      case 'sunny': return <FaSun className="weather-icon" />;
      case 'rainy': return <FaCloudRain className="weather-icon" />;
      default: return <FaCloudSun className="weather-icon" />;
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

  const generatePDF = (record) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Monitoring Report", 14, 22);
    
    doc.setFontSize(12);
    const details = [
      ["Project ID", record.Project_ID || "N/A"],
      ["Project Name", record.Project_Name || "N/A"],
      ["Location", record.Location || "N/A"],
      ["Date", formatDate(record.Monitoring_Date)],
      ["Issues Found", record.Issues_Found || "No issues reported"],
      ["Weather Conditions", record.Weather_Conditions || "Unknown"],
      ["Workers Present", record.Workers_Present || 0],
    ];
    
    let startY = 30;
    const lineHeight = 10;
    
    doc.setFont("helvetica", "bold");
    doc.text("Field", 14, startY);
    doc.text("Value", 100, startY);
    
    doc.setFont("helvetica", "normal");
    details.forEach(([label, value], index) => {
      const y = startY + (index + 1) * lineHeight;
      doc.text(String(label), 14, y);
      doc.text(String(value), 100, y);
    });
    
    doc.save(`Monitoring_Report_${record.Project_ID || "Unknown"}.pdf`);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="monitoring-page-wrapper">
        <div className="loading-spinner">Loading records...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="monitoring-page-wrapper">
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
    <div className="monitoring-page-wrapper">
      <Header />
      <div className="monitoring-container">
        <div className="monitoring-header">
          <div className="monitoring-controls">
            <input
              type="text"
              placeholder="Search projects by name, location, issues found, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button" disabled={loading}>
              <FaSearch />
            </button>
          </div>
          <h1 className="monitoring-title">On-Site Monitoring</h1>
          <div className="monitoring-buttons">
            
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="no-records">
            {records.length === 0 
              ? "No monitoring records found. Create your first record!" 
              : "No records match your search criteria"}
          </div>
        ) : (
          <>
            <div className="monitoring-table-container">
              <table className="monitoring-table">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Issues Found</th>
                    <th>Weather</th>
                    <th>Workers</th>
                    <th>Actions</th>
                    <th>Photos</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record) => (
                    <tr key={record._id}>
                      <td>{record.Project_ID || "N/A"}</td>
                      <td>{record.Project_Name || "N/A"}</td>
                      <td>{record.Location || "N/A"}</td>
                      <td>{formatDate(record.Monitoring_Date)}</td>
                      <td>{record.Issues_Found || "No issues reported"}</td>
                      <td>
                        <div className="weather-cell">
                          {getWeatherIcon(record.Weather_Conditions)}
                          <span>{record.Weather_Conditions || "unknown"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="workers-badge">
                          {record.Workers_Present || 0}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons-container">
                          <button 
                            className="action-button pdf"
                            onClick={() => generatePDF(record)}
                          >
                            Download PDF
                          </button>
                        </div>
                      </td>
                      <td>
                        <Link 
                          to={`/viewSitePhotos/${record._id}`}
                          className="photos-button"
                        >
                          View Photos
                        </Link>
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

export default Monitoring;