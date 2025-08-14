import React, { useState, useEffect } from "react";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button, Alert } from "react-bootstrap";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [userIds, setUserId] = useState(null); // Initialize as null to indicate unset

  // Retrieve userId from localStorage on mount
  useEffect(() => {
    const storedUserIds = localStorage.getItem("userId");
    console.log("Retrieved userId from localStorage:", storedUserIds); // Debugging
    setUserId(storedUserIds || null); // Set to stored value or null
  }, []);

  // Validate MongoDB ObjectId
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // Fetch tasks by Worker_ID (userId)
  const fetchTasks = async () => {
    if (!userIds) {
      console.warn("No userId available, skipping fetchTasks");
      setAlert({
        show: true,
        message: "Please log in to view tasks.",
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/tasks/worker/${userIds}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fetched tasks:", JSON.stringify(response.data.tasks, null, 2)); // Detailed debugging
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setAlert({
        show: true,
        message: `Failed to load tasks: ${error.response?.data?.message || error.message}`,
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (_id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${_id}`,
        { Task_Status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Task status updated:", response.data);
  
      // Show success alert
      setAlert({
        show: true,
        message: "Task status updated successfully!",
        variant: "success",
      });
  
      // Refresh the tasks
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
      setAlert({
        show: true,
        message: `Failed to update task: ${error.response?.data?.message || error.message}`,
        variant: "danger",
      });
    }
  };
  
  

  // Fetch tasks when userId is set
  useEffect(() => {
    if (userIds) {
      fetchTasks();
    }
  }, [userIds]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case "in-progress":
        return <Badge bg="info">In Progress</Badge>;
      case "completed":
        return <Badge bg="success">Complete</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "low":
        return <Badge bg="success">Low</Badge>;
      case "medium":
        return <Badge bg="warning" text="dark">Medium</Badge>;
      case "high":
        return <Badge bg="danger">High</Badge>;
      default:
        return <Badge bg="secondary">{priority}</Badge>;
    }
  };

  return (
    <div>
      <Topnav />
      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        <Container fluid className="mt-4">
          <h1
            className="mb-5 text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#2c3e50",
              fontWeight: "bold",
            }}
          >
            Your Tasks
          </h1>
          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert({ show: false, message: "", variant: "" })}
              dismissible
              className="text-center"
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              {alert.message}
            </Alert>
          )}
          {loading ? (
            <p className="text-center" style={{ fontSize: "1.2rem", color: "#2c3e50" }}>
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-center" style={{ fontSize: "1.2rem", color: "#2c3e50" }}>
              No tasks assigned.
            </p>
          ) : (
            <Row>
              {tasks.map((task) => (
                <Col md={4} key={task._id} className="mb-4">
                  <Card
                    className="shadow-lg border-0"
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      transition: "transform 0.3s ease",
                      background: "rgba(255, 255, 255, 0.95)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <Card.Header
                      className="text-white d-flex justify-content-between align-items-center"
                      style={{
                        background: "linear-gradient(45deg, #3498db, #8e44ad)",
                        borderRadius: "20px 20px 0 0",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>{task.Project_ID}</span>
                      {getStatusBadge(task.Task_Status)}
                    </Card.Header>
                    <Card.Body className="p-4">
                      <Card.Text className="text-dark">
                        <strong>Description:</strong> {task.Description || "N/A"}
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Project Manager:</strong> {task.PM_Name} ({task.Project_Manager_ID})
                        </small>
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Worker ID:</strong> {task.Worker_ID}
                        </small>
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Deadline:</strong> {new Date(task.Deadline).toLocaleDateString()}
                        </small>
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Priority:</strong> {getPriorityBadge(task.Priority_Level)}
                        </small>
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
                        </small>
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
                        </small>
                      </Card.Text>
                      <div className="d-flex gap-2 flex-wrap">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => updateTaskStatus(task._id, "in-progress")}
                          style={{ borderRadius: "10px" }}
                          disabled={task.Task_Status === "completed"}
                        >
                          In Progress
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => updateTaskStatus(task._id, "completed")}
                          style={{ borderRadius: "10px" }}
                          disabled={task.Task_Status === "completed"}
                        >
                          Complete
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          style={{
                            borderRadius: "10px",
                            background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
                          }}
                          as={Link}
                          to={`/Newbudget/${task.Project_ID}`}
                        >
                          Do Task
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
        <Fot />
      </div>
    </div>
  );
}

export default Task;