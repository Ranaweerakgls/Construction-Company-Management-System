import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:5000/Orders";

function UpdateOrder() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    Itemname: "",
    Quantity: "",
    Otype: "",
    Remarks: "",
    Date: "",
    Supplier: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        if (response.data && response.data.order) {
          setOrder(response.data.order);
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${id}`, order);
      alert("Order updated successfully!");
      navigate("/OrderView");
    } catch (err) {
      alert("Error updating order details: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const inventoryItems = [
    "Cement",
    "Bricks",
    "Steel Rods",
    "Sand",
    "Gravel",
    "Wood Planks",
    "Glass Sheets",
    "Electrical Wiring",
    "Pipes",
    "Paint",
    "Tiles",
    "Concrete Blocks",
    "PVC Pipes",
    "Nails",
    "Screws",
    "Hinges",
    "Door Locks",
    "Windows",
    "Roof Sheets",
    "Adhesives",
    "Sealants",
    "Insulation Foam",
    "Reinforcement Bars",
    "Marble Slabs",
    "Granite Slabs",
    "PVC Panels",
    "Aluminum Sheets",
    "Bolts",
    "Washers",
    "Drills",
    "Plasterboard",
    "Wooden Beams",
    "Flooring",
    "Cables",
    "Lamps",
    "Bulbs",
    "Bathroom Fixtures",
    "Kitchen Fixtures",
    "Guttering",
    "Scaffolding",
    "Hand Tools",
    "Power Tools",
    "Sandpaper",
    "Safety Gear",
    "Ladders",
    "Masonry Tools",
    "Measuring Tape",
    "Brushes",
    "Rollers",
    "Construction Glue",
    "Epoxy Resin",
  ];

  return (
    <div>
      <div style={{ maxWidth: "450px", margin: "30px auto", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #ddd", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#28a745" }}>Update Order Details</h2>

        <form onSubmit={handleSubmit}>
          {/* Select Field with Hardcoded Inventory Items */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="itemName" style={{ fontWeight: "600", color: "#333" }}>Order Item</label><br />
            <select
              id="itemName"
              name="Itemname"
              value={order.Itemname}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", marginTop: "8px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#ffffff" }}
            >
              <option value="">Select an item</option>
              {inventoryItems.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="itemqty" style={{ fontWeight: "600", color: "#333" }}>Quantity</label><br />
            <input type="text" id="itemqty" name="Quantity" placeholder="Quantity" value={order.Quantity} onChange={handleChange}
              style={{ width: "100%", padding: "10px", marginTop: "8px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#ffffff" }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="ordertype" style={{ fontWeight: '600', color: '#333' }}>Order Type</label><br />
            <select
              id="ordertype"
              name="Otype"
              value={order.Otype}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#ffffff', // white background for select fields
              }}
            >
              <option value="">Select whether the order is emergency or not</option>
              <option value="Emergency">Emergency</option>
              <option value="Non-emergency">Non-emergency</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="remarks" style={{ fontWeight: '600', color: '#333' }}>Description</label><br />
            <textarea
              id="remarks"
              name="Remarks"
              placeholder="Mention specific details (e.g., Melva products only)"
              value={order.Remarks}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                height: '100px',
                backgroundColor: '#ffffff', // white background for textarea
              }}
            ></textarea>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="date" style={{ fontWeight: '600', color: '#333' }}>Date</label><br />
            <input
              type="date"
              id="date"
              name="Date"
              value={order.Date}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#ffffff', // white background for date input
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="supplier" style={{ fontWeight: '600', color: '#333' }}>Select Supplier</label><br />
            <select
              id="supplier"
              name="Supplier"
              value={order.Supplier}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#ffffff', // white background for select fields
              }}
            >
              <option value="">Select Supplier</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
            </select>
          </div>

          <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "12px 18px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%", fontSize: "16px", marginTop: "20px" }}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;
