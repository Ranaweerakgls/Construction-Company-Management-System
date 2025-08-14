import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RequirementsTable({ Requirementusers, setRequirementusers }) {
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update-requirement/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/requiments/${id}`);
      setRequirementusers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("Requirement record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record.");
    }
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Segoe UI, sans-serif",
    marginTop: "20px",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const thStyle = {
    padding: "12px 16px",
    backgroundColor: "#343a40",
    color: "white",
    textAlign: "left",
    position: "sticky",
    top: 0,
    border: "1px solid #ddd",
  };

  const tdStyle = {
    padding: "12px 16px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  const buttonStyle = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const updateButton = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "white",
    marginRight: "8px",
  };

  const deleteButton = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "white",
  };

  const rowHoverStyle = {
    transition: "background-color 0.3s",
  };

  return (
    <div style={{ overflowX: "auto", padding: "1rem" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Client Name</th>
            <th style={thStyle}>Project Name</th>
            <th style={thStyle}>Contact Number</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Requirements Type</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Requirementusers.length > 0 ? (
            Requirementusers.map((Requirementuser, index) => (
              <tr
                key={Requirementuser._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  ...rowHoverStyle,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e6f2ff")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f9f9f9" : "white")
                }
              >
                <td style={tdStyle}>{Requirementuser.Client_Name}</td>
                <td style={tdStyle}>{Requirementuser.Project_Name}</td>
                <td style={tdStyle}>{Requirementuser.Contact_Number}</td>
                <td style={tdStyle}>{Requirementuser.Email}</td>
                <td style={tdStyle}>{Requirementuser.Requirements_Type}</td>
                <td style={tdStyle}>{Requirementuser.Date}</td>
                <td style={tdStyle}>
                  <button
                    style={updateButton}
                    onClick={() => handleUpdate(Requirementuser._id)}
                  >
                    Update
                  </button>
                  <button
                    style={deleteButton}
                    onClick={() => handleDelete(Requirementuser._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ ...tdStyle, textAlign: "center" }}>
                No Requirements found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequirementsTable;
