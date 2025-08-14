import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import background from "../pictures/stock.jpg";

const URL = "http://localhost:5000/Equipments";

function UpdateEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({
    Ename: "",
    EType: "",
    Qty: "",
    Remarks: "",
    Date: "",
    Supplier: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        if (response.data && response.data.equipment) {
          setEquipment(response.data.equipment);
        } else {
          throw new Error("Equipment not found");
        }
      } catch (err) {
        setError("Failed to fetch equipment");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, [id]);

  const handleChange = (e) => {
    setEquipment({ ...equipment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${id}`, equipment);
      alert("Equipment updated successfully!");
      navigate("/EquipmentView");
    } catch (err) {
      alert("Error updating equipment: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              width: "500px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
              backgroundColor: "white",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#003366",
              }}
            >
              Update Equipment
            </h1>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label style={{ marginBottom: "8px" }}>Equipment Name:</label>
              <input
                type="text"
                name="Ename"
                value={equipment.Ename}
                onChange={handleChange}
                required
                placeholder="Enter equipment name"
                style={{
                  padding: "8px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ marginBottom: "8px" }}>Equipment Type:</label>
              <select
                name="EType"
                value={equipment.EType}
                onChange={handleChange}
                required
                style={{
                  padding: "8px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select equipment type</option>
                <option value="vehicle">Vehicle</option>
                <option value="machine">Machine</option>
                <option value="other">Other</option>
              </select>

              <label style={{ marginBottom: "8px" }}>Quantity:</label>
              <input
                type="text"
                name="Qty"
                value={equipment.Qty}
                onChange={handleChange}
                required
                placeholder="Enter quantity"
                style={{
                  padding: "8px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ marginBottom: "8px" }}>Remarks:</label>
              <input
                type="text"
                name="Remarks"
                value={equipment.Remarks}
                onChange={handleChange}
                placeholder="Enter remarks"
                style={{
                  padding: "8px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ marginBottom: "8px" }}>Date:</label>
              <input
                type="date"
                name="Date"
                value={equipment.Date}
                onChange={handleChange}
                required
                style={{
                  padding: "8px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ marginBottom: "8px" }}>
                Supplier (for rented equipment):
              </label>
              <select
                name="Supplier"
                value={equipment.Supplier}
                onChange={handleChange}
                style={{
                  padding: "8px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select Supplier</option>
                <option value="Supplier A">Supplier A</option>
                <option value="Supplier B">Supplier B</option>
                <option value="Supplier C">Supplier C</option>
              </select>

              <button
                type="submit"
                style={{
                  backgroundColor: "#003366",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateEquipment;
