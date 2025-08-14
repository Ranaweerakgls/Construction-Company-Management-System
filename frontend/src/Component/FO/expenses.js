import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import Expens from "./expensesread";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { FaSearch, FaDownload } from "react-icons/fa";

const URL = "http://localhost:5000/Expenses";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array on error
  }
};

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setExpenses(data || []));
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filterExpens = (data || []).filter((expense) =>
        Object.values(expense).some((field) =>
          field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setExpenses(filterExpens);
      setNoResults(filterExpens.length === 0);
    });
  };

  const handleDownload = async () => {
    try {
      // Fetch all expenses
      const data = await fetchHandler();
      const expensesToDownload = data || [];

      if (expensesToDownload.length === 0) {
        alert("No expenses available to download.");
        return;
      }

      // Define headers and map to API field names
      const headers = ["P_ID", "Expenses_Details", "Amount", "Date"];
      const fieldMap = {
        P_ID: "P_ID", // Adjust based on your API field name
        Expenses_Details: "expencedetails", // Adjust based on your API field name
        Amount: "amount", // This matches, so it works
        Date: "createdDate", // Adjust based on your API field name
      };

      const csvRows = [
        headers.join(","), // Header row
        ...expensesToDownload.map((expense) =>
          headers
            .map((header) => {
              const field = fieldMap[header];
              const value = expense[field] || "";
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
      link.setAttribute("download", "expenses.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expenses:", error);
      alert("Failed to download expenses. Please try again.");
    }
  };

  return (
    <div>
      <Topnav />
      <div>
        <Container className="d-flex justify-content-center align-items-center flex-column mt-4 w-100">
          <Row className="w-75 mb-3">
            <Col xs={3} className="d-flex justify-content-start">
              <Button variant="primary" className="px-5 py-2" href="/Newexpenses">
                Expenses
              </Button>
            </Col>
            <Col xs={6}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search Expenses..."
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
                <p>No Expenses Found</p>
              </Col>
            </Row>
          ) : null}
          <br />
          <h1 className="mb-4">Expenses Details</h1>
        </Container>
        <Container className="mt-4">
          <Row className="w-100 mt-2">
            <Col>
              <Table className="mt-2">
                <thead className="table-secondary">
                  <tr>
                    <th style={{ width: "150px" }}>P_ID</th>
                    <th style={{ width: "300px" }}>Expenses Details</th>
                    <th style={{ width: "220px" }}>Amount</th>
                    <th style={{ width: "200px" }}>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>

          <div>
            {expenses &&
              expenses.map((expense, i) => (
                <div key={i}>
                  <Expens expenses={expense} />
                </div>
              ))}
          </div>
        </Container>
      </div>
      <Fot />
    </div>
  );
}

export default Expenses;