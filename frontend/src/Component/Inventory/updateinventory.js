import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function EditInventory() {
  const { _id } = useParams(); // Get _id from URL params
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    P_ID: "",
    P_Name: "",
    Description: "",
    Date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Log _id to verify
  console.log('URL Parameter _id:', _id);

  // Fetch existing item data on component mount
  useEffect(() => {
    const fetchItem = async () => {
      if (!_id) {
        setError('No _id provided in URL');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/inventoryreq/${_id}`);
        console.log('API Response:', response.data);

        const item = response.data.data || response.data;
        if (!item) throw new Error('No item data found in response');

        setInputs({
          P_ID: item.P_ID || '',
          P_Name: item.P_Name || '',
          Description: item.Description || '',
          Date: item.Date ? new Date(item.Date).toISOString().split('T')[0] : '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory item:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchItem();
  }, [_id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/inventoryreq/${_id}`, {
        P_ID: inputs.P_ID,
        P_Name: inputs.P_Name,
        Description: inputs.Description,
        Date: inputs.Date,
      });
      console.log('Inventory item updated:', inputs);
      navigate('/Inventory');
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <h1 className="text-center mb-4 text-primary">Edit Inventory Details</h1>

          <Form.Group className="mb-3" controlId="formPID">
            <Form.Label>P_ID</Form.Label>
            <Form.Control
              type="text"
              name="P_ID"
              onChange={handleChange}
              value={inputs.P_ID}
              placeholder="Enter P_ID"
              required
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="P_Name"
              onChange={handleChange}
              value={inputs.P_Name}
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
              onChange={handleChange}
              value={inputs.Description}
              placeholder="Enter Description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCreateDate">
            <Form.Label>Create Date</Form.Label>
            <Form.Control
              type="date"
              name="Date"
              onChange={handleChange}
              value={inputs.Date}
              required
            />
          </Form.Group>

          <div className="mt-4" style={{ width: '100%' }}>
            <Button variant="primary" type="submit" className="w-100">
              Update
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default EditInventory;