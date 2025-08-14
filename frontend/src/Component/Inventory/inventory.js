import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]); // State for inventory data
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventoryreq');
        console.log('Fetched Inventory Data:', response.data); // Log to verify _id
        setInventoryItems(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, []); // Empty dependency array means it runs once on mount

  // Filter items based on search term
  const filteredItems = inventoryItems.filter(item =>
    item.P_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.P_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search form submission (optional, filtering happens on input change)
  const handleSearch = (e) => {
    e.preventDefault();
    // Filtering is already handled by filteredItems
  };

  // Handle delete action
  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/inventoryreq/${_id}`);
        setInventoryItems(inventoryItems.filter(item => item._id !== _id)); // Remove item from state
        console.log(`Deleted item with _id: ${_id}`);
      } catch (error) {
        console.error('Error deleting inventory item:', error);
      }
    }
  };

  return (
    <div className="page-container">
      <Header />
      <Container className="mt-4 mb-5">
        {/* Header Section with Search Bar and Add New Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form inline className="d-flex" style={{ width: '50%' }} onSubmit={handleSearch}>
            <Form.Control
              type="text"
              placeholder="Search Inventory..."
              className="mr-2"
              style={{ width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
          <Button
            variant="primary"
            as={Link}
            to="/addinven"
          >
            Add New Inventory
          </Button>
        </div>

        {/* Table Section */}
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>P_ID</th>
              <th>P_Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.P_ID}</td>
                  <td>{item.P_Name}</td>
                  <td>{item.Description}</td>
                  <td>{new Date(item.Date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      as={Link} // Use Link instead of href
                      to={`/Inventoryup/${item._id}`} // Correct path with template literal
                      className="mr-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No inventory items found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  );
}

export default Inventory;