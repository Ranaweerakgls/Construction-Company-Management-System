import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/esm/Table';

function ScheduleProject(props) {
  const { _id, Project_Name, Project_Location, Client_Details, Supervisor_Details, Start_Date, End_Date } = props.ScheduleProject;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/ProjectSchedules/${_id}`)
      .then(res => res.data)
      .then(() => history("/ScheduleProjectDetails"));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Schedule Projects Display</h2>
          <Table bordered>
            <tbody>
              <tr>
                <th>Project ID</th>
                <td>{_id}</td>
              </tr>
              <tr>
                <th>Project Name</th>
                <td>{Project_Name}</td>
              </tr>
              <tr>
                <th>Project Location</th>
                <td>{Project_Location}</td>
              </tr>
              <tr>
                <th>Client Details</th>
                <td>{Client_Details}</td>
              </tr>
              <tr>
                <th>Supervisor Details</th>
                <td>{Supervisor_Details}</td>
              </tr>
              <tr>
                <th>Start Date</th>
                <td>{Start_Date}</td>
              </tr>
              <tr>
                <th>End Date</th>
                <td>{End_Date}</td>
              </tr>
            </tbody>
          </Table>
          <div className="mt-3">
            <Button 
              variant="success" 
              as={Link} 
              to={`/ScheduleProjectDetails/${_id}`}
              className="me-2"
            >
              Update
            </Button>
            <Button 
              variant="danger" 
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ScheduleProject;