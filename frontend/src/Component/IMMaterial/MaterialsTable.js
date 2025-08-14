import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MaterialsTable({ materials, setMaterials }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
  if (!id) {
    alert("Invalid material ID.");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to remove this material from inventory?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/Materials/${id}`);
    setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id));
    alert("Material deleted successfully!");
  } catch (err) {
    alert("Error deleting material: " + (err.response?.data?.message || err.message));
  }
};


  const filteredMaterials = materials.filter((material) =>
    material.MID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    minHeight: "100vh", // ensures full height
    backdropFilter: "none", // allows background through
    //backgroundColor: "rgba(255, 255, 255, 0.8)", // optional slight white tint
  }}>
      <h1 style={{
        color: "#003366",
        fontSize: "2.5em",
        marginBottom: "20px",
        fontWeight: "bold"
      }}>Material Stock</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by Material ID"
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

      {/* Table */}
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
            <th style={{ padding: "12px" }}>Material ID</th>
            <th style={{ padding: "12px" }}>Material Name</th>
            <th style={{ padding: "12px" }}>Quantity</th>
            <th style={{ padding: "12px" }}>Remarks</th>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Supplier</th>
            <th style={{ padding: "12px" }}>Files</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material, index) => (
              <tr key={material._id} style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff"
              }}>
                <td style={{ padding: "12px" }}>{material.MID}</td>
                <td style={{ padding: "12px" }}>{material.Mname}</td>
                <td style={{ padding: "12px" }}>{material.Qty}</td>
                <td style={{ padding: "12px" }}>{material.Remarks}</td>
                <td style={{ padding: "12px" }}>{new Date(material.Date).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{material.Supplier}</td>
                <td style={{ padding: "12px" }}>
                  {material.pdfFile ? (
                    <button
                      onClick={() => {
                        setSelectedPDF(material.pdfFile);
                        setShowModal(true);
                      }}
                      style={{
                        color: "#007bff",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline"
                      }}
                    >
                      View
                    </button>
                  ) : (
                    <span style={{ color: "#999" }}>No file</span>
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => navigate(`/UpdateMaterial/${material._id}`)}
                    style={buttonStyle("#28a745")}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(material._id)}
                    style={buttonStyle("#dc3545")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "20px", textAlign: "center" }}>No materials found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PDF Modal */}
      {showModal && selectedPDF && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => {
            setShowModal(false);
            setSelectedPDF(null);
          }}
        >
          <div
            style={{
              width: "80%",
              height: "90%",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              position: "relative",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedPDF(null);
              }}
              style={buttonStyle("#dc3545", {
                position: "absolute",
                top: 10,
                right: 10,
                padding: "8px 14px"
              })}
            >
              Close
            </button>

            <iframe
              src={`http://localhost:5000/materialuploads/${selectedPDF}`}
              width="100%"
              height="100%"
              title="PDF Viewer"
              style={{ border: "none", borderRadius: "8px" }}
            />
          </div>
        </div>
      )}
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

export default MaterialsTable;
