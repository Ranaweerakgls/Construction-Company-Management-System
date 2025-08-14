import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

function Budgetread(props) {
  const { _id, P_ID,name,location,amount,createdDate,status,description } = props.budget;
  const formattedDate = createdDate ? createdDate.split("T")[0] : "";

  const navigate = useNavigate(); 

const deleteHandler = async () => {
 
  const confirmDelete = window.confirm("Are you sure you want to delete this budget?");
  
  if (!confirmDelete) {
    console.log("Delete canceled by user");
    return; 
  }


  try {
    console.log("Deleting budget with ID:", _id); // Debug the ID
    const response = await axios.delete(`http://localhost:5000/Budgets/${_id}`);
    console.log("Delete response:", response.data); // Debug the response
    alert("Budget deleted successfully!");
    navigate("/budget"); 
    window.location.reload();
  } catch (error) {
    console.error("Error deleting budget:", error.response ? error.response.data : error.message);
    alert("Failed to delete budget: " + (error.response ? error.response.data.message : error.message));
  }
};

  return (
    <Container className="mt-4">
      <Row className="w-1000 mt-4">
        <Col>
          <Table className="mt-2">
            <tbody>
              <tr>
                <td style={{width:"100px"}}>{P_ID}</td>
                <td style={{width:"110px"}}>{name}</td>
                <td style={{width:"150px"}}>{location}</td>
                <td style={{width:"130px"}}>{amount}</td>
                <td style={{width:"130px"}}>{formattedDate}</td>
                <td style={{width:"130px"}}>{status}</td>
                <td style={{width:"150px"}}>{description}</td>
                <td>
                  <Button variant="success" className="mx-1" as={Link} to={`/Budget/${_id}`}>
                    Update
                  </Button>
                  <Button variant="danger" className="mx-1" onClick={deleteHandler}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Budgetread;
