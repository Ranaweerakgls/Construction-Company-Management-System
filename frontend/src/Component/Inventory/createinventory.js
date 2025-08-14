import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function AddInventory() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    P_ID: '',
    P_Name: '', // Changed from Project_Name to match backend
    Description: '',
    Date: '', // Changed from Create_Date to match backend
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/inventoryreq', {
        P_ID: inputs.P_ID,
        P_Name: inputs.P_Name,
        Description: inputs.Description,
        Date: inputs.Date,
      });
      console.log('Inventory item added:', inputs);
      navigate('/Inventory'); // Redirect to inventory list
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4 mb-5">
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "70%",
            background: "#ffff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 className="text-center mb-4 text-primary">Add Inventory Details</h1>

          <Form.Group className="mb-3" controlId="formPID">
            <Form.Label>P_ID</Form.Label>
            <Form.Control
              type="text"
              name="P_ID"
              value={inputs.P_ID}
              onChange={handleChange}
              placeholder="Enter P_ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="P_Name" // Changed to match backend
              value={inputs.P_Name}
              onChange={handleChange}
              placeholder="Enter Project Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Description"
              value={inputs.Description}
              onChange={handleChange}
              placeholder="Enter Description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCreateDate">
            <Form.Label>Create Date</Form.Label>
            <Form.Control
              type="date"
              name="Date" // Changed to match backend
              value={inputs.Date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="mt-4" style={{ width: '100%' }}>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default AddInventory;