import Navbar from "../topnav/supervisor/ss";
import Footer from "../bottomnav/foter";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge, Button, Card, Col } from "react-bootstrap";

function SupervisorTasks() {
  const navigate = useNavigate();
  const [userIds, setUserId] = useState("");
  const [tasks, setTasks] = useState([]);

  // Get user ID from localStorage
  useEffect(() => {
    const userids = localStorage.getItem("userid");
    if (userids) {
      setUserId(userids);
    } else {
      navigate("/log");
    }
  }, [navigate]);

  // Fetch tasks
  useEffect(() => {
    if (!userIds) return;

    const getTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Tasks/worker/${userIds}`
        );
        const taskList = response.data.tasks;
        console.log(taskList);
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTask();
  }, [userIds]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/Tasks/update_status/${taskId}`, {
        Task_Status: newStatus,
      });
      setTasks(
        tasks.map((task) =>
          task.Task_ID === taskId ? { ...task, Task_Status: newStatus } : task
        )
      );
      setTimeout(
        () => {},
        3000
      );
    } catch (error) {
      console.error("Error updating task:", error);

    }
  };

  const getStatusBadge = (status) => {
    console.log(status)
    switch (status) {
      case "pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      case "in-progress":
        return <Badge bg="info">In Progress</Badge>;
      case "completed":
        return <Badge bg="success">Complete</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="users-page-wrapper">
      <Navbar />
      <div className="d-flex flex-wrap gap-4 m-5 min-vh-75 bg-white bg-opacity-75 p-4 rounded-5">

      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Col  key={task.Task_ID} md="auto">
            <Card
              className="shadow-lg border-0"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                background: "rgba(255, 255, 255, 0.95)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
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
                    Assigned by: {task.PM_Name}
                  </small>
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Deadline: {new Date(task.Deadline).toLocaleDateString()}
                  </small>
                </Card.Text>
                <div className="d-flex gap-2 flex-wrap">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      updateTaskStatus(task.Task_ID, "in-progress")
                    }
                    style={{ borderRadius: "10px" }}
                    disabled={task.Task_Status === "completed"}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => updateTaskStatus(task.Task_ID, "completed")}
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
                    to={`/site-supervisor/monitor/create/${task.Project_ID}`}
                  >
                    Do Task
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
            </div>

      <Footer />
    </div>
  );
}

export default SupervisorTasks;
