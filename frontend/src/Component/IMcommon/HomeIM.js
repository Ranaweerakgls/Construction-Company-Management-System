import Header from '../topnav/IM/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { Card, Row, Col, Container, Button, ProgressBar, ListGroup, Carousel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import inventoryImg from '../pictures/inventory2.jpg';
import materialImg from '../pictures/tools.jpg';
import stockImg from '../pictures/stock.jpg';
import SupplierMap from './SupplierMap'; // adjust the path as needed
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";




function App() {
  


  const [statusPercentages, setStatusPercentages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Confirmed Orders
        const ordersResponse = await axios.get("http://localhost:5000/ConfirmedOrders");
        const orders = ordersResponse.data.records || [];

        const statusCount = {
          confirmed: 0,
          processing: 0,
          shipped: 0,
          delivered: 0,
        };

        orders.forEach((order) => {
          const status = order.OStatus?.toLowerCase();
          if (statusCount[status] !== undefined) {
            statusCount[status]++;
          }
        });

        const total = Object.values(statusCount).reduce((sum, val) => sum + val, 0);
        const statusPercent = Object.keys(statusCount).map((key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value: total > 0 ? Math.round((statusCount[key] / total) * 100) : 0,
          color: {
              confirmed: "#007bff", // Blue – primary
              processing: "#fd7e14", // Orange – attention/delay
              shipped: "#20c997", // Teal – in transit
              delivered: "#28a745", // Green – success

          }[key],
        }));

        setStatusPercentages(statusPercent);

        // Fetch Notifications
        const notificationsResponse = await axios.get("http://localhost:5000/Notification");
        console.log("Notifications API Response:", notificationsResponse.data);
        const notificationData = notificationsResponse.data.notification || notificationsResponse.data || [];
        const notificationArray = Array.isArray(notificationData) ? notificationData : [];
        setNotifications(notificationArray);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setStatusPercentages([]);
        setNotifications([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

        
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      {/* Full-width Carousel */}
      <div style={{ width: "100%", height: "300px", overflow: "hidden", marginBottom: "20px" }}>
        <Carousel style={{ height: "100%" }}>
          <Carousel.Item>
            <div style={{
              height: "300px",
              backgroundImage: `url(${stockImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center"
              }}>
                <h5>Seamlessly track and manage materials and equipment.</h5>
                <p>Real-time visibility into stock levels ensures the right resources are always available</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div style={{
              height: "300px",
              backgroundImage: `url(${materialImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center"
              }}>
                <h5>Assign the right materials and equipment to the right projects – effortlessly.</h5>
                <p>Strategic allocation ensures smooth project execution and resource optimization.</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div style={{
              height: "300px",
              backgroundImage: `url(${inventoryImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center"
              }}>
                <h5>Automated order placement when materials run low – never pause a project again</h5>
                <p>Proactive inventory intelligence helps keep every site running efficiently</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <Container className="mb-4">
  <Row>
    {/* Left Column: Narrower Progress Bar Graph */}
    <Col md={5}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)"
      }}>
        <h5 className="text-center mb-3">📦 Current Order Status</h5>
        {statusPercentages.map((status, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <strong>{status.label}</strong>
              <span>{status.value}%</span>
            </div>
            <ProgressBar now={status.value} variant="custom" style={{ backgroundColor: "#e9ecef" }}>
              <ProgressBar
                now={status.value}
                style={{ backgroundColor: status.color }}
                animated
              />
            </ProgressBar>
          </div>
        ))}
      </div>
    </Col>

    {/* Middle Column: Two Cards Stacked Vertically */}
    <Col md={3}>
  {/* Confirmed Orders Card - Navigate on click */}
  <div
    onClick={() => navigate('/OrderStatus')}
    style={{ cursor: 'pointer' }}
  >
    <Card className="mb-3 shadow-sm text-white bg-primary" style={{ minHeight: '100px' }}>
      <Card.Body className="d-flex align-items-center">
        <i className="fas fa-check-circle fa-2x me-3"></i>
        <div>
          <Card.Title className="mb-1">Confirmed Orders</Card.Title>
        </div>
      </Card.Body>
    </Card>
  </div>

  {/* Your Orders Card - Navigate on click */}
  <div
    onClick={() => navigate('/OrderView')}
    style={{ cursor: 'pointer' }}
  >
    <Card className="shadow-sm border-primary bg-light" style={{ minHeight: '100px' }}>
  <Card.Body className="d-flex align-items-center">
    <i className="fas fa-box-open fa-2x text-primary me-3"></i> {/* Updated icon */}
    <div>
      <Card.Title className="mb-1 text-primary">Your Orders</Card.Title>
    </div>
  </Card.Body>
</Card>

  </div>
</Col>



    {/* Right Column: Map */}
    <Col md={4}>
      <div style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <SupplierMap />
      </div>
    </Col>
  </Row>
</Container>


      {/* Content Section */}
      <Container>
        {/* Side-by-side Pending Projects and Announcements */}
        <Row className="mt-3">
  <Col md={12}>
    <Card className="w-100">
      <Card.Header as="h5" className="bg-primary text-white">📢 Announcements</Card.Header>
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

      <Footer />
    </div>
  );
}

export default App;