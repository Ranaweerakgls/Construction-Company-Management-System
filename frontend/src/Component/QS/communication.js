import React from 'react'
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


function communicationfo() {
  return (
    <div>
        <Topnav/>
        <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
                <Form
                 // onSubmit={handleSubmit}
                  style={{
                    width: "70%",
                    background: "#ffff",
                    padding: "40px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <h1 className="text-center mb-4 text-success">Communication</h1>
        
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label style={{ fontWeight: "bold" }}>Your ID</Form.Label>
                    <Form.Control
                      type="text"
                    // onChange={handleChange}
                      placeholder="Enter Name"
                      name="P_ID"
                     // value={input.P_ID}
                      required
                    />
                  </Form.Group>
        
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                     // onChange={handleChange}
                      placeholder="Enter Name"
                      name="name"
                     // value={input.name}
                      required
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="formGroupDate">
                    <Form.Label style={{ fontWeight: "bold" }}>Create Date</Form.Label>
                    <Form.Control
                      type="date"
                     // onChange={handleChange}
                      name="createdDate"
                    //  value={input.createdDate}
                      required
                    />
                  </Form.Group>
        
                  <Form.Group className="mb-3" controlId="formGroupLocation">
                    <Form.Label style={{ fontWeight: "bold" }}>Send</Form.Label>
                    <Form.Select
                    //  onChange={handleChange}
                      name="status"
                    //  value={input.status}
                      required
                    >
                      <option value="Pending">QS</option>
                      <option value="Pending">PM</option>
                      <option value="Pending">Inventory Manager</option>
                    </Form.Select>
                  </Form.Group>
        
                  <Form.Group className="mb-3" controlId="formGroupDescription">
                    <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                     // onChange={handleChange}
                      name="description"
                     // value={input.description} 
                      placeholder="Enter Description"
                    />
                  </Form.Group>
        
                  <Button variant="success" type="submit" className="w-100">
                    Submit
                  </Button>
                </Form>
              </Container>
        <Fot/>
    </div>
  )
}

export default communicationfo
