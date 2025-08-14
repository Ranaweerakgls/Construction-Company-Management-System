import { useEffect, useState } from "react";
import axios from "axios";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBudget() {
  const [input, setInput] = useState({
    P_ID: "",
    expencedetails:"",
    amount: "",
    createdDate: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        console.log("Fetching expense with ID:", id);
        const response = await axios.get(`http://localhost:5000/Expenses/${id}`);
        console.log("API Response:", JSON.stringify(response.data, null, 2));
        const expensesData = response.data.expenses; 
        setInput({
            P_ID:expensesData.P_ID,
            expencedetails:expensesData.expencedetails,
            amount: expensesData.amount,
            createdDate: expensesData.createdDate ? expensesData.createdDate.split("T")[0] : ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budget:", error);
        setError("Failed to load budget data: " + error.message);
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const response = await axios.put(`http://localhost:5000/Expenses/${id}`, {
        P_ID: String(input.P_ID),
        expencedetails:String(input.expencedetails),
        amount: Number(input.amount),
        createdDate: Date(input.createdDate)
    });
    return response.data;
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert("Expense updated successfully!");
      navigate("/Expenses");
    } catch (error) {
      console.error("Error in submission:", error);
      alert("Error updating expenses: " + error.message);
    }
  };

  console.log("Current input state:", input);

  if (loading) return <div>Loading budget data...</div>;
  if (error) return <div>{error}</div>;

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
              placeholder="Enter Name"
              name="P_ID"
              value={input.P_ID}
              required
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label style={{ fontWeight: "bold" }}>Expenses Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={handleChange}
              name="expencedetails"
              value={input.expencedetails} 
              placeholder="Enter Details"
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
              readOnly
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
              readOnly
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Update
          </Button>
        </Form>
      </Container>
      <Fot />
    </div>
  );
}

export default UpdateBudget;