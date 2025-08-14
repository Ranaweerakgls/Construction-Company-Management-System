import React, { useState } from "react";
import axios from 'axios';
//import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";


function OrdersForm() {
  //const navigate = useNavigate();

  // Material list
  const inventoryItems = [
    "Cement", "Bricks", "Steel Rods", "Sand", "Gravel", "Wood Planks", "Glass Sheets", "Electrical Wiring",
    "Pipes", "Paint", "Tiles", "Concrete Blocks", "PVC Pipes", "Nails", "Screws", "Hinges", "Door Locks",
    "Windows", "Roof Sheets", "Adhesives", "Sealants", "Insulation Foam", "Reinforcement Bars", "Marble Slabs",
    "Granite Slabs", "PVC Panels", "Aluminum Sheets", "Bolts", "Washers", "Drills", "Plasterboard", "Wooden Beams",
    "Flooring", "Cables", "Lamps", "Bulbs", "Bathroom Fixtures", "Kitchen Fixtures", "Guttering", "Scaffolding",
    "Hand Tools", "Power Tools", "Sandpaper", "Safety Gear", "Ladders", "Masonry Tools", "Measuring Tape", "Brushes",
    "Rollers", "Construction Glue", "Epoxy Resin"
  ];

  const [inputs, setInputs] = useState({
    Itemname: "",
    Quantity: "",
    Otype: "",
    Remarks: "",
    Date: "",
    Supplier: "",
  });

  const generatePDF = () => {
    const doc = new jsPDF();
  
  
    // Title
    doc.setFontSize(18);
    doc.setTextColor("#0A3D62");
    doc.text("Saman Builders", 50, 20);
    doc.setFontSize(14);
    doc.setTextColor("#333");
    doc.text("Order Confirmation Report", 50, 28);
  
    // Line divider
    doc.setLineWidth(0.5);
    doc.line(15, 35, 195, 35);
  
    // Order details
    doc.setFontSize(12);
    doc.setTextColor("#000");
    const yStart = 45;
    const lineHeight = 10;
  
    const dataLines = [
      `Item Name: ${inputs.Itemname}`,
      `Quantity: ${inputs.Quantity}`,
      `Order Type: ${inputs.Otype}`,
      `Remarks: ${inputs.Remarks}`,
      `Date: ${inputs.Date}`,
      `Supplier: ${inputs.Supplier}`,
      `Generated: ${new Date().toLocaleString()}`
    ];
  
    dataLines.forEach((line, i) => {
      doc.text(line, 20, yStart + i * lineHeight);
    });
  
    // Footer
    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text("Thank you for using Saman Builders", 20, 280);
  
    // Save the file
    doc.save(`Order_${inputs.Itemname}_${Date.now()}.pdf`);
  };
  

  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      alert('✅ Order successfully placed!');
      
      // Ask user if they want to download the report
      const shouldDownload = window.confirm("Do you want to download the order report as a PDF?");
      if (shouldDownload) {
        generatePDF(); // Only generate/download if user agrees
      }
    });
  };
  
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/Orders", {
      Itemname: typeof inputs.Itemname === "string" ? inputs.Itemname : inputs.Itemname?.value || "unknown",
      Quantity: String(inputs.Quantity),
      Otype: typeof inputs.Otype === "string" ? inputs.Otype : inputs.Otype?.value || "unknown",
      Remarks: String(inputs.Remarks),
      Date: inputs.Date instanceof Date ? inputs.Date.toISOString() : new Date(inputs.Date).toISOString(),
      Supplier: typeof inputs.Supplier === "string" ? inputs.Supplier : inputs.Supplier?.value || "Unknown"
    }).then(res => res.data);
  }

  // Navigate to the view placed orders page
  // const handleViewOrders = () => {
  //   navigate('/OrderView'); // Adjust route as needed
  // };

  return (
    <div>
      {/* View Placed Orders Button container with Flexbox */}
  

      
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#0056b3" }}>Place New Order</h2>

        <form onSubmit={handleSubmit}>
          {/* Select Field with Hardcoded Inventory Items */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="itemName" style={{ fontWeight: "600", color: "#333" }}>Order Item</label><br />
            <select
              id="itemName"
              name="Itemname"
              value={inputs.Itemname}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#ffffff"
              }}
            >
              <option value="">Select an item</option>
              {inventoryItems.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="itemqty" style={{ fontWeight: "600", color: "#333" }}>Quantity</label><br />
            <input
              type="text"
              id="itemqty"
              name="Quantity"
              placeholder="Quantity"
              value={inputs.Quantity}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#ffffff"
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="ordertype" style={{ fontWeight: '600', color: '#333' }}>Order Type</label><br />
            <select
              id="ordertype"
              name="Otype"
              value={inputs.Otype}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
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
              value={inputs.Remarks}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                height: '100px',
                backgroundColor: '#ffffff',
              }}
            ></textarea>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="date" style={{ fontWeight: '600', color: '#333' }}>Date</label><br />
            <input
              type="date"
              id="date"
              name="Date"
              value={inputs.Date}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="supplier" style={{ fontWeight: '600', color: '#333' }}>Select Supplier</label><br />
            <select
              id="supplier"
              name="Supplier"
              value={inputs.Supplier}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#ffffff',
              }}
            >
              <option value="">Select Supplier</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#0056b3",
              color: "white",
              padding: "12px 18px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontSize: "16px",
              marginTop: "20px"
            }}
          >
            Confirm
          </button>
        </form>
      
      <p style={{textAlign:"center",color:"#0056b3"}}>You can edit or cancel your order within 30 minutes after placing it. If time has exceeded, please contact the supplier.</p>
    </div>
  );
}

export default OrdersForm;
