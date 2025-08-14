import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EquipmentTable({ equipments = [], setEquipments }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this equipment?");
  if (!confirmDelete) return; // User canceled the deletion

  try {
    await axios.delete(`http://localhost:5000/Equipments/${id}`);
    setEquipments((prev) => prev.filter((equipment) => equipment._id !== id));
    alert("Equipment deleted successfully!");
  } catch (err) {
    alert("Error deleting equipment: " + err.message);
  }
};


  const filteredEquipments = equipments.filter((equipment) =>
    equipment.EType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "20px",
      minHeight: "100vh",
    }}>
      <h1 style={{
        color: "#003366",
        fontSize: "2.5em",
        marginBottom: "20px",
        fontWeight: "bold"
      }}>Equipment Stock</h1>

      <input
        type="text"
        placeholder="🔍 Search by Equipment Type"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "12px",
          width: "30%",
          marginBottom: "25px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          outline: "none"
        }}
      />

      <table style={{
        width: "90%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <thead>
          <tr style={{
            backgroundColor: "#003366",
            color: "#fff",
            textAlign: "left"
          }}>
            <th style={{ padding: "12px" }}>Equipment Name</th>
            <th style={{ padding: "12px" }}>Equipment Type</th>
            <th style={{ padding: "12px" }}>Quantity</th>
            <th style={{ padding: "12px" }}>Remarks</th>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Supplier</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipments.length > 0 ? (
            filteredEquipments.map((equipment, i) => (
              <tr key={equipment._id} style={{
                backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff"
              }}>
                <td style={{ padding: "12px" }}>{equipment.Ename}</td>
                <td style={{ padding: "12px" }}>{equipment.EType}</td>
                <td style={{ padding: "12px" }}>{equipment.Qty}</td>
                <td style={{ padding: "12px" }}>{equipment.Remarks}</td>
                <td style={{ padding: "12px" }}>{new Date(equipment.Date).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{equipment.Supplier}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => navigate(`/UpdateEquipment/${equipment._id}`)}
                    style={buttonStyle("#28a745")}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(equipment._id)}
                    style={buttonStyle("#dc3545")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>
                No equipment found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Reusable button style function
function buttonStyle(color, extraStyles = {}) {
  return {
    backgroundColor: color,
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    ...extraStyles
  };
}

export default EquipmentTable;
