import React, { useState, useEffect } from "react";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Budget() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    P_ID: "",
    name: "",
    location: "",
    amount: "",
    createdDate: "",
    status: "Pending...",
    description: "No Changes yet",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        console.log("Fetching budget with ID:", userId);
        const response = await axios.get(
          `http://localhost:5000/ProjectSchedules/project/${userId}`
        );
        // console.log("API Response:", JSON.stringify(response.data, null, 2));
        const taskData = response.data.projectSchedule;
        console.log("API Response:", response.data);
        setInput({
          P_ID: taskData.Project_ID || "",
          name: taskData.Project_Name||"",
          location:taskData.Project_Location|| "",
          amount: "",
          createdDate: "",
          status: "Pending...",
          description: "No Changes yet",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budget:", error);
        setError("Failed to load budget data: " + error.message);
        setLoading(false);
      }
    };
    fetchHandler();
  }, [userId]);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("Updated Input:", input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      // Create budget
      await sendRequest();
      alert("Budget added successfully!");

      // Generate WhatsApp click-to-chat URL
      const pmPhone = "+940764703413"; // PM's phone number
      const message = encodeURIComponent(
        `*Dear Project Manager*,\n\n` +
          `*A new budget has been created with the following details*:\n` +
          `----------------------------------------\n` +
          `*P_ID:* ${input.P_ID}\n` +
          `*Name:* ${input.name}\n` +
          `*Amount:* ${input.amount}\n` +
          `*Date:* ${input.createdDate}\n` +
          `----------------------------------------\n\n` +
          `*Please review the details and take necessary actions.*\n\n` +
          `Best regards,\n` +
          `SMN Sync 360\n\n` +
          `*This is a system-generated message. ©SMN Sync 360 All rights reserved.*`
      );
      const whatsappUrl = `https://wa.me/${pmPhone}?text=${message}`;

      // Open WhatsApp URL
      window.open(whatsappUrl, "_blank");

      navigate("/Budget");
    } catch (error) {
      console.error("Error in submission:", error);
      if (error.response && error.response.status === 400) {
        alert("P_ID is already used. Please use a different P_ID.");
      } else {
        console.error("Error in submission:", error.response || error);
        alert("Failed to add budget. Check the console for details.");
      }
    }
  };

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/Budgets", {
      P_ID: String(input.P_ID),
      name: String(input.name),
      location: String(input.location),
      amount: Number(input.amount),
      createdDate: Date(input.createdDate),
      status: String(input.status),
      description: String(input.description),
    });
    return response.data;
  };

  return (
    <div>
      <Topnav />
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
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
          <h1 className="text-center mb-4 text-primary">Add Budget Details</h1>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label style={{ fontWeight: "bold" }}>P_ID</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter P_ID"
              name="P_ID"
              value={input.P_ID}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Name"
              name="name"
              value={input.name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLocation">
            <Form.Label style={{ fontWeight: "bold" }}>Location</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Location"
              name="location"
              value={input.location}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupAmount">
            <Form.Label style={{ fontWeight: "bold" }}>Amount</Form.Label>
            <Form.Control
              type="number"
              onChange={handleChange}
              placeholder="Enter Amount"
              name="amount"
              value={input.amount}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupDate">
            <Form.Label style={{ fontWeight: "bold" }}>Create Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              name="createdDate"
              value={input.createdDate}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLocation">
            <Form.Label style={{ fontWeight: "bold" }}>Status</Form.Label>
            <Form.Select
              onChange={handleChange}
              name="status"
              value={input.status}
              required
            >
              <option value="Pending">Pending..</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={handleChange}
              name="description"
              value={input.description}
              placeholder="Enter Description"
            />
          </Form.Group>

          <Button variant="btn btn-primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
      <Fot />
    </div>
  );
}

export default Budget;
