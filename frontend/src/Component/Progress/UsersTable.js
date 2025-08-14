import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UsersTable({ Progressusers, setProgressusers }) {
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/progress/${id}`);
      setProgressusers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("Progress record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record.");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#e3f2fd", color: "#333", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Project ID</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Project Name</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Description</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Duration</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Completion %</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Image</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Progressusers.length > 0 ? (
            Progressusers.map((Progressuser, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #ddd", backgroundColor: i % 2 === 0 ? "#f1f8ff" : "#ffffff" }}>
                <td style={{ padding: "10px" }}>{Progressuser.Project_ID}</td>
                <td style={{ padding: "10px" }}>{Progressuser.Project_Name}</td>
                <td style={{ padding: "10px" }}>{Progressuser.Description}</td>
                <td style={{ padding: "10px" }}>{Progressuser.Duration}</td>
                <td style={{ padding: "10px" }}>{Progressuser.Date}</td>
                <td style={{ padding: "10px" }}>{Progressuser.Status}</td>
                <td style={{ padding: "10px" }}>
                  <div style={{ backgroundColor: "#e0e0e0", borderRadius: "6px", height: "20px", width: "100%" }}>
                    <div
                      style={{
                        width: `${Progressuser.Completion_Percentage || 0}%`,
                        backgroundColor: "#4caf50",
                        height: "100%",
                        borderRadius: "6px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "12px",
                        lineHeight: "20px",
                      }}
                    >
                      {Progressuser.Completion_Percentage || 0}%
                    </div>
                  </div>
                </td>

                <td style={{ padding: "10px" }}>
                  {Progressuser.Image ? (
                    <img
                      src={`http://localhost:5000/progressuploads/${Progressuser.Image}`}
                      alt="Progress"
                      width="100"
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  <button 
                    style={{ backgroundColor: "#64b5f6", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", marginRight: "5px", cursor: "pointer" }} 
                    onClick={() => handleUpdate(Progressuser._id)}>Update
                  </button>
                  <button 
                    style={{ backgroundColor: "#e57373", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }} 
                    onClick={() => handleDelete(Progressuser._id)}>Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "10px", textAlign: "center", color: "#777" }}>No Progress Users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
