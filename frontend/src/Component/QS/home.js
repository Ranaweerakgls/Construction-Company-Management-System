import React, { useState, useEffect } from "react";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import "react-calendar/dist/Calendar.css"; // Import the default styles
import "./home.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  Carousel,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import inventoryImg from "../pictures/stock.jpg";
import materialImg from "../pictures/tools.jpg";
import stockImg from "../pictures/pic5.jpg";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaPiggyBank,
  FaExclamationCircle,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  //for calendar
  const [date, setDate] = useState(new Date());

  // Fetch budgets from backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Budgets");
      console.log("Budgets API Response:", response.data);
      const budgetData = response.data.Budgets || response.data || [];
      const budgetArray = Array.isArray(budgetData) ? budgetData : [];
      setBudgets(budgetArray);
      if (budgetArray.length > 0) {
        setSelectedBudgetId(budgetArray[0].P_ID);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setBudgets([]);
    }
  };

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Notification");
      console.log("Notifications API Response:", response.data);
      const notificationData =
        response.data.notification || response.data || [];
      const notificationArray = Array.isArray(notificationData)
        ? notificationData
        : [];
      setNotifications(notificationArray);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Expenses");
      console.log("Expenses API Response:", response.data);
      const expenseData = response.data.Expenses || response.data || [];
      const expenseArray = Array.isArray(expenseData) ? expenseData : [];
      setExpenses(expenseArray);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses([]);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchBudgets(),
        fetchExpenses(),
        fetchNotifications(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle dropdown selection
  const handleBudgetSelect = (eventKey) => {
    setSelectedBudgetId(eventKey);
  };

  // Get selected budget amount
  const getBudgetAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId) return "Rs 0";
    const selectedBudget = budgets.find(
      (budget) => budget.P_ID === selectedBudgetId
    );
    return selectedBudget
      ? `Rs ${Number(selectedBudget.amount).toLocaleString()}`
      : "Rs 0";
  };

  // Calculate spent amount for selected P_ID
  const getSpentAmount = () => {
    if (loading) return "Loading...";
    if (expenses.length === 0 || !selectedBudgetId) return "Rs 0";
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    return `Rs ${totalSpent.toLocaleString()}`;
  };

  // Calculate remaining amount for selected P_ID
  const getRemainingAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId) return "Rs 0";
    const selectedBudget = budgets.find(
      (budget) => budget.P_ID === selectedBudgetId
    );
    const totalBudget = selectedBudget ? Number(selectedBudget.amount) : 0;
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const remaining = totalBudget - totalSpent;
    return `Rs ${remaining < 0 ? 0 : remaining.toLocaleString()}`;
  };

  // Calculate overdue amount for selected P_ID (excess over budget)
  const getOverdueAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId || expenses.length === 0)
      return "Rs 0";
    const selectedBudget = budgets.find(
      (budget) => budget.P_ID === selectedBudgetId
    );
    const totalBudget = selectedBudget ? Number(selectedBudget.amount) : 0;
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const overdue = totalSpent - totalBudget;
    return overdue > 0 ? `Rs ${overdue.toLocaleString()}` : "Rs 0";
  };

  // Dynamic chart data based on expenses for selected P_ID
  const getChartData = () => {
    if (loading || !selectedBudgetId || expenses.length === 0) {
      return {
        labels: ["No Data"],
        datasets: [
          {
            label: "Expenses",
            data: [0],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    }

    const filteredExpenses = expenses.filter(
      (expenses) => expenses.P_ID === selectedBudgetId
    );
    const labels = filteredExpenses.map(
      (expenses) => new Date(expenses.createdDate).toLocaleDateString() // Format date as needed
    );
    const data = filteredExpenses.map((expenses) => Number(expenses.amount));

    return {
      labels: labels.length > 0 ? labels : ["No Expenses"],
      datasets: [
        {
          label: "Expenses",
          data: data.length > 0 ? data : [0],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses Over Time" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Expenses (Rs)" } },
      x: { title: { display: true, text: "Date" } },
    },
  };

  return (
    <div>
      <Topnav />
      {/* Full-width Carousel */}
      <div
        style={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <Carousel style={{ height: "100%" }}>
          <Carousel.Item>
            <div
              style={{
                height: "300px",
                backgroundImage: `url(${inventoryImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h5>
                  Effortlessly monitor and control project costs and resources.
                </h5>
                <p>
                  Real-time tracking of material usage and expenses ensures
                  accurate budgeting and optimal resource allocation for every
                  phase of construction.
                </p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div
              style={{
                height: "300px",
                backgroundImage: `url(${materialImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h5>Stay on top of every cost with precision and clarity.</h5>
                <p>
                  Live updates on quantities and pricing empower quantity
                  surveyors to manage budgets, reduce waste, and maximize
                  project value.
                </p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div
              style={{
                height: "300px",
                backgroundImage: `url(${stockImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h5>Streamline cost planning and forecasting with ease.</h5>
                <p>
                  Access up-to-date data on materials and labor to ensure
                  accurate estimates and informed decision-making throughout the
                  project lifecycle.
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <Container fluid className="mt-4">
        {/* Top: Budget Dropdown */}
        <Row className="mb-6">
          <Col md={12}>
            <h3>Budget Overview</h3>
            <Row>
              <Col md={2} className="mb-3">
                <Dropdown onSelect={handleBudgetSelect}>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ backgroundColor: "#0056b3", color: "white" }}
                  >
                    {loading
                      ? "Loading..."
                      : selectedBudgetId || "Select a Budget"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {budgets.map((budget) => (
                      <Dropdown.Item key={budget.P_ID} eventKey={budget.P_ID}>
                        {budget.P_ID}
                      </Dropdown.Item>
                    ))}
                    {budgets.length === 0 && !loading && (
                      <Dropdown.Item disabled>
                        No Budgets Available
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={2} className="mb-3">
                <Card
                  style={{
                    backgroundColor: "#0056b3",
                    color: "white",
                    height: "100px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <FaMoneyBillWave /> Total Budget
                    </Card.Title>
                    <Card.Text>{getBudgetAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={2} className="mb-3">
                <Card
                  style={{
                    backgroundColor: "#1E3F66",
                    color: "white",
                    height: "100px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <FaShoppingCart /> Spent
                    </Card.Title>
                    <Card.Text>{getSpentAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={2} className="mb-3">
                <Card
                  style={{
                    backgroundColor: "#4B9CD3",
                    color: "white",
                    height: "100px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <FaPiggyBank /> Remaining
                    </Card.Title>
                    <Card.Text>{getRemainingAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={2} className="mb-3">
                <Card
                  style={{
                    backgroundColor: "#4B4B4B",
                    color: "white",
                    height: "100px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <FaExclamationCircle /> Overdue
                    </Card.Title>
                    <Card.Text>{getOverdueAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Right: Expenses Bar Chart */}
        <Row className="mt-4">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Bar data={getChartData()} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Calendar onChange={setDate} value={date} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Bottom: Announcements */}
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header as="h5" className="bg-primary text-white">
                📢 Announcements
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <Card.Text>Loading notifications...</Card.Text>
                ) : notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <Card.Text key={index}>
                      <strong>
                        {notification.Date
                          ? new Date(notification.Date).toLocaleDateString()
                          : "No Date"}
                        :
                      </strong>{" "}
                      {notification.message || "No message available"}
                    </Card.Text>
                  ))
                ) : (
                  <Card.Text>No announcements available.</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Fot />
    </div>
  );
}

export default Home;
