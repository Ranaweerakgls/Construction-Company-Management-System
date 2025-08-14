import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../topnav/Header';
import Footer from '../bottomnav/foter';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Carousel,
  ProgressBar,
  Button,
  Spinner,
} from 'react-bootstrap';
import { CurrencyDollar, Wallet2, PiggyBank } from 'react-bootstrap-icons';


import axios from 'axios';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import pic4 from '../pictures/pic4.jpg';
import pic2 from '../pictures/pic2.jpg';
import pic3 from '../pictures/pic3.jpg';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Project Locations
const projectLocations = [
  {
    name: 'Kandy General Hospital',
    position: [7.2919, 80.6360],
    description: 'Healthcare project site - Kandy Hospital',
  },
  {
    name: 'SLIIT Kandy Campus',
    position: [7.2534, 80.5911],
    description: 'Education project site - SLIIT Kandy',
  },
  {
    name: 'Kurunegala Bus Stand',
    position: [7.4863, 80.3625],
    description: 'Transportation hub - Kurunegala',
  },
  {
    name: 'Nallur Kovil, Jaffna',
    position: [9.6758, 80.0255],
    description: 'Cultural project site - Nallur Kovil',
  },
];

function App() {
  const [selectedProject, setSelectedProject] = useState('project1');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [notifications, setNotifications] = useState([]); 
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const navigate = useNavigate();

  const projectData = {
    project1: {
      progress: { completed: 75, inProgress: 20, notStarted: 5 },
      budget: { total: 100000, spent: 65000, remaining: 35000 },
    },
    project2: {
      progress: { completed: 45, inProgress: 35, notStarted: 20 },
      budget: { total: 150000, spent: 90000, remaining: 60000 },
    },
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedback');
        if (response.data.feedbackusers) {
          setFeedbacks(response.data.feedbackusers);
        } else {
          console.error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoadingFeedbacks(false);
      }
    };
    const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Notification');
      const notificationData = response.data.notification || response.data || [];
      const notificationArray = Array.isArray(notificationData) ? notificationData : [];
      setNotifications(notificationArray);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  };

    fetchFeedbacks();
    fetchNotifications();
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const { completed, inProgress, notStarted } = projectData[selectedProject].progress;

  return (
    <div>
      <Header />

      {/* Carousel */}
      <Carousel className="mb-5" fade>
        {[pic4, pic2, pic3].map((pic, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={pic}
              alt={`Slide ${idx + 1}`}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h5>
                {idx === 0 && 'Seamlessly track and manage materials and equipment.'}
                {idx === 1 && 'Assign the right materials and equipment to the right projects – effortlessly.'}
                {idx === 2 && 'Automated order placement when materials run low – never pause a project again.'}
              </h5>
              <p>
                {idx === 0 && 'Real-time visibility into stock levels ensures the right resources are always available.'}
                {idx === 1 && 'Strategic allocation ensures smooth project execution and resource optimization.'}
                {idx === 2 && 'Proactive inventory intelligence helps keep every site running efficiently.'}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Budget Overview Cards */}
      <Container className="mb-5">
        <Row className="justify-content-center">
          {['Total Budget', 'Spent', 'Remaining'].map((label, idx) => {
            const value = ['total', 'spent', 'remaining'][idx];
            const icon = [<CurrencyDollar />, <Wallet2 />, <PiggyBank />][idx];
            const color = ['primary', 'info', 'secondary'][idx];
            return (
              <Col md={4} className="mb-3" key={label}>
                <Card className={`text-white bg-${color} h-100 shadow`}>
                  <Card.Body className="text-center">
                    {React.cloneElement(icon, { size: 40, className: 'mb-2' })}
                    <Card.Title>{label}</Card.Title>
                    <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      ${projectData[selectedProject].budget[value].toLocaleString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Project Progress and Announcements */}
      <Container>
        <Row>
          <Col md={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header as="h5" className="bg-primary text-white text-center">
                📊 Project Progress
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Select Project</Form.Label>
                  <Form.Select value={selectedProject} onChange={handleProjectChange}>
                    <option value="project1">P001</option>
                    <option value="project2">P002</option>
                  </Form.Select>
                </Form.Group>
                <div>
                  <p>Completed</p>
                  <ProgressBar now={completed} label={`${completed}%`} variant="success" className="mb-3" />
                  <p>In Progress</p>
                  <ProgressBar now={inProgress} label={`${inProgress}%`} variant="warning" className="mb-3" />
                  <p>Not Started</p>
                  <ProgressBar now={notStarted} label={`${notStarted}%`} variant="danger" className="mb-3" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm mb-4">
    <Card.Header as="h5" className="bg-primary text-white text-center">
      📢 Announcements
    </Card.Header>
    <Card.Body>
      {/* With this dynamic content */}
      {loadingNotifications ? (
        <Card.Text>Loading announcements...</Card.Text>
      ) : notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Card.Text key={index}>
            <strong>
              {notification.Date
                ? new Date(notification.Date).toLocaleDateString()
                : 'No Date'}
              :
            </strong>{' '}
            {notification.message || 'No message available'}
          </Card.Text>
        ))
      ) : (
        <Card.Text>No announcements available.</Card.Text>
      )}
    </Card.Body>
  </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header as="h5" className="bg-info text-white text-center">
                💬 Feedback Carousel
              </Card.Header>
              <Card.Body>
                {loadingFeedbacks ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="info" />
                  </div>
                ) : feedbacks.length > 0 ? (
                  <Carousel interval={null} indicators={false}>
                    {feedbacks.slice(0, 3).map((feedback) => (
                      <Carousel.Item key={feedback._id}>
                        <Card className="text-center bg-secondary text-white shadow">
                          <Card.Body>
                            <Card.Title>{new Date(feedback.Date).toLocaleDateString()}</Card.Title>
                            <Card.Text>{feedback.feedback}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <Card.Text>No feedbacks available.</Card.Text>
                )}
              </Card.Body>
              <Card.Footer className="bg-transparent border-top-0">
                <div className="d-flex justify-content-end">
                  <Button onClick={() => navigate('/FeedcackTableView')} variant="primary">
                    Read More
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 🌍 Project Location Map with Multiple Markers */}
      <Container className="my-5">
        <Card className="shadow">
          <Card.Header className="bg-success text-white text-center">
            🌍 Project Location Map
          </Card.Header>
          <Card.Body>
            <MapContainer center={[7.8731, 80.7718]} zoom={7.5} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {projectLocations.map((loc, idx) => (
                <Marker key={idx} position={loc.position}>
                  <Popup>
                    <strong>{loc.name}</strong>
                    <br />
                    {loc.description}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
