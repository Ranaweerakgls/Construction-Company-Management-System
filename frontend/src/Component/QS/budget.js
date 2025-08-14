import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import axios from "axios";
import Budgetr from "./budgetread";
import Table from "react-bootstrap/Table";
import { FaSearch, FaDownload } from "react-icons/fa";

const URL = "http://localhost:5000/Budgets";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { Budgets: [] }; // Return empty array on error
  }
};

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setBudgets(data.Budgets || []));
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filterBudget = (data.Budgets || []).filter((budget) =>
        Object.values(budget).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBudgets(filterBudget);
      setNoResults(filterBudget.length === 0);
    });
  };

  const handleDownload = async () => {
    try {
      // Fetch all budgets
      const data = await fetchHandler();
      const budgetsToDownload = data.Budgets || [];

      if (budgetsToDownload.length === 0) {
        alert("No budgets available to download.");
        return;
      }

      // Convert budgets to CSV
      const headers = ["P_ID", "Name", "Location", "Amount", "Date", "Status", "Description"];
      const fieldMap = {
        P_ID: "P_ID", // Make sure this matches the API response field name
        Name: "name",
        Location: "location",
        Amount: "amount",
        Date: "createdAt", // Ensure this is the correct field name from the API
        Status: "status",
        Description: "description",
      };

      const csvRows = [
        headers.join(","), // Header row
        ...budgetsToDownload.map((budget) =>
          headers
            .map((header) => {
              const field = fieldMap[header]; 
              const value = budget[field] || "";
              return `"${value.toString().replace(/"/g, '""')}"`; // Escape quotes in CSV
            })
            .join(",")
        ),
      ];

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "budgets.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading budgets:", error);
      alert("Failed to download budgets. Please try again.");
    }
  };

  return (
    <div>
      <Topnav />
      <div>
        <Container className="d-flex justify-content-center align-items-center flex-column mt-4 w-300">
          <Row className="w-75 mb-3">
            <Col xs={3} className="d-flex justify-content-start">
              <Button variant="primary" className="px-5 py-2" href="/Newbudget">
                New Budget
              </Button>
            </Col>
            <Col xs={5}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search Budget..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch}>
                  <FaSearch />
                </Button>
              </InputGroup>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
              <Button variant="success" className="px-4 py-2" onClick={handleDownload}>
                <FaDownload /> Download
              </Button>
            </Col>
          </Row>
          {noResults ? (
            <Row className="w-75 mb-3">
              <Col className="text-center">
                <p>No Budget Found</p>
              </Col>
            </Row>
          ) : null}
          <br />
          <h1 className="mb-4">Budget Details</h1>
        </Container>
        <Container className="mt-4">
          <Row className="w-200 mt-2">
            <Col>
              <Table className="mt-2">
                <thead className="table-secondary">
                  <tr>
                    <th>P_ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>

          <div>
            {budgets &&
              budgets.map((budget, i) => (
                <div key={i}>
                  <Budgetr budget={budget} />
                </div>
              ))}
          </div>
        </Container>
      </div>
      <Fot />
    </div>
  );
}

export default Budget;