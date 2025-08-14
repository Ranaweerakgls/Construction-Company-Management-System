import React, { useState, useEffect } from "react";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  ProgressBar,
  Carousel,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import inventoryImg from "../pictures/fo1.jpg";
import materialImg from "../pictures/fo2.jpg";
import stockImg from "../pictures/pic5.jpg";

// Register ChartJS components for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function FOHome() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

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

  // Fetch all data on component mount
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

  // Get selected budget amount (returns number for calculations)
  const getBudgetAmount = () => {
    if (loading) return 0;
    if (budgets.length === 0 || !selectedBudgetId) return 0;
    const selectedBudget = budgets.find(
      (budget) => budget.P_ID === selectedBudgetId
    );
    return selectedBudget ? Number(selectedBudget.amount) : 0;
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

  // Get spent amount as number for progress bar
  const getSpentAmountNumber = () => {
    if (loading) return 0;
    if (expenses.length === 0 || !selectedBudgetId) return 0;
    return expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
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

  // Get remaining amount as number for progress bar
  const getRemainingAmountNumber = () => {
    if (loading) return 0;
    if (budgets.length === 0 || !selectedBudgetId) return 0;
    const selectedBudget = budgets.find(
      (budget) => budget.P_ID === selectedBudgetId
    );
    const totalBudget = selectedBudget ? Number(selectedBudget.amount) : 0;
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const remaining = totalBudget - totalSpent;
    return remaining < 0 ? 0 : remaining;
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

  // Get overdue amount as number for progress bar
  const getOverdueAmountNumber = () => {
    if (loading) return 0;
    if (budgets.length === 0 || !selectedBudgetId || expenses.length === 0)
      return 0;
    const selectedBudget = budgets.find(
      (budget) => budget.P_ID === selectedBudgetId
    );
    const totalBudget = selectedBudget ? Number(selectedBudget.amount) : 0;
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const overdue = totalSpent - totalBudget;
    return overdue > 0 ? overdue : 0;
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
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      };
    }

    const filteredExpenses = expenses.filter(
      (expense) => expense.P_ID === selectedBudgetId
    );
    const labels = filteredExpenses.map((expense) =>
      new Date(expense.createdDate).toLocaleDateString()
    );
    const data = filteredExpenses.map((expense) => Number(expense.amount));

    return {
      labels: labels.length > 0 ? labels : ["No Expenses"],
      datasets: [
        {
          label: "Expenses",
          data: data.length > 0 ? data : [0],
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
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

  // Calculate max value for progress bars
  const totalBudget = getBudgetAmount();
  const spent = getSpentAmountNumber();
  const remaining = getRemainingAmountNumber();
  const overdue = getOverdueAmountNumber();
  const maxValue = Math.max(totalBudget, spent, overdue) || 10000;

  return (
    <div>
      <Topnav />
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
                  Gain full control over financial operations and reporting.
                </h5>
                <p>
                  Real-time tracking of budgets, expenses, and revenues ensures
                  transparency and smarter financial decision-making across all
                  departments.
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
                <h5>
                  Ensure financial stability with accurate tracking and
                  analysis.
                </h5>
                <p>
                  Monitor cash flow, manage accounts, and generate detailed
                  reports to support strategic decision-making and financial
                  transparency.
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
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Select Budget</Form.Label>
              <Dropdown onSelect={handleBudgetSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
                    <Dropdown.Item disabled>No Budgets Available</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
        </Row>

        {/* Main Content: Budget Bars (Left) and Line Chart (Right) */}
        <Row>
          {/* Left: Budget Bars */}
          <Col md={6}>
            <h3>Budget Overview</h3>
            <br />
            <div className="mb-3">
              <h6>Total Budget: Rs {totalBudget.toLocaleString()}</h6>
              <ProgressBar
                variant="primary"
                now={(totalBudget / maxValue) * 100}
                label={`Rs ${totalBudget.toLocaleString()}`}
              />
            </div>
            <div className="mb-3">
              <h6>Spent: {getSpentAmount()}</h6>
              <ProgressBar
                variant="success"
                now={(spent / maxValue) * 100}
                label={getSpentAmount()}
              />
            </div>
            <div className="mb-3">
              <h6>Remaining: {getRemainingAmount()}</h6>
              <ProgressBar
                variant="warning"
                now={(remaining / maxValue) * 100}
                label={getRemainingAmount()}
              />
            </div>
            <div className="mb-3">
              <h6>Overdue: {getOverdueAmount()}</h6>
              <ProgressBar
                variant="danger"
                now={(overdue / maxValue) * 100}
                label={getOverdueAmount()}
              />
            </div>
          </Col>

          {/* Right: Expenses Line Chart */}
          <Col md={6}>
            <h3>Expenses Over Time</h3>
            <div style={{ height: "400px" }}>
              <Line data={getChartData()} options={chartOptions} />
            </div>
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

export default FOHome;
