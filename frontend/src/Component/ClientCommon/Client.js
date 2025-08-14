import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
//import './App.css';

import HeaderClient from '../topnav/ClientNav/HeaderClient';
import Footer from '../bottomnav/foter';
import pic4 from '../pictures/pic4.jpg';
import pic2 from '../pictures/pic2.jpg';
import pic3 from '../pictures/pic3.jpg';
import c1 from '../pictures/c1.jpg';
import c2 from '../pictures/c2.jpg';
import c3 from '../pictures/c3.jpg';
import c4 from '../pictures/c4.jpg';
import c5 from '../pictures/c5.jpg';

// Custom icon for the marker
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function App() {
  const navigate = useNavigate();

  const progressData = [
    { month: 'Jan', progress: 10 },
    { month: 'Feb', progress: 25 },
    { month: 'Mar', progress: 40 },
    { month: 'Apr', progress: 55 },
    { month: 'May', progress: 70 },
    { month: 'Jun', progress: 85 },
    { month: 'Jul', progress: 100 }
  ];

  return (
    <div>
      <style>
        {`
          .card-3d {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            transform-style: preserve-3d;
            cursor: pointer;
            will-change: transform;
          }

          .card-3d:hover {
            transform: perspective(1000px) rotateY(5deg) scale(1.03);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
          }

          .map-responsive {
            overflow: hidden;
            padding-bottom: 56.25%;
            position: relative;
            height: 0;
          }
        `}
      </style>

      <HeaderClient />

      {/* Carousel */}
      <Carousel fade className="mb-5">
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
                {idx === 1 &&
                  'Assign the right materials and equipment to the right projects – effortlessly.'}
                {idx === 2 &&
                  'Automated order placement when materials run low – never pause a project again.'}
              </h5>
              <p>
                {idx === 0 &&
                  'Real-time visibility into stock levels ensures the right resources are always available.'}
                {idx === 1 &&
                  'Strategic allocation ensures smooth project execution and resource optimization.'}
                {idx === 2 &&
                  'Proactive inventory intelligence helps keep every site running efficiently.'}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Chart + Feedback */}
      <div className="container mb-5">
        <div className="row">
          {/* Chart */}
          <div className="col-md-8">
            <h5 className="text-primary mb-3">Project P001 Progress (Month-wise)</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={progressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Line type="monotone" dataKey="progress" stroke="#007bff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Feedback */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                <div
                  style={{ width: '6px', height: '30px', backgroundColor: '#007bff', borderRadius: '4px' }}
                ></div>
                <div
                  style={{ width: '6px', height: '30px', backgroundColor: '#007bff', borderRadius: '4px' }}
                ></div>
                <div
                  style={{ width: '6px', height: '30px', backgroundColor: '#007bff', borderRadius: '4px' }}
                ></div>
              </div>
              <div
                className="card shadow-sm"
                style={{
                  width: '250px',
                  borderRadius: '12px',
                  border: '1px solid #007bff',
                  backgroundColor: '#e3f2fd'
                }}
              >
                <div className="card-body text-center">
                  <h6 className="card-subtitle mb-2 text-primary">Have Feedback?</h6>
                  <p className="card-text" style={{ fontSize: '14px' }}>
                    Let us know what you think!
                  </p>
                  <button onClick={() => navigate('/Feedbacks')} className="btn btn-sm btn-primary">
                    Go to Feedbacks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Highlights */}
      <div className="container mb-5">
        <h5 className="text-primary mb-3">project progress</h5>
        <div className="row">
          {[c4, c2, c5, c1, c3].map((img, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <div className="card h-100 card-3d shadow-sm">
                <img
                  src={img}
                  className="card-img-top"
                  alt={`Week ${idx + 1}`}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                  }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title text-primary mb-0">Week {idx + 1}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="container mb-5">
        <h5 className="text-primary mb-3">Project Location (Kagalla Bus Stand)</h5>
        <div className="map-responsive">
          <MapContainer center={[7.2665, 80.3667]} zoom={15} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[7.2665, 80.3667]} icon={markerIcon}>
              <Popup>Kagalla Bus Stand</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
