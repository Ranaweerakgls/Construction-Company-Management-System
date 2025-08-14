import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card } from 'react-bootstrap'; // Added missing import
import 'leaflet/dist/leaflet.css';

// Fix icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const monitoringSites = [
  { 
    name: 'Site A - Colombo', 
    position: [6.9271, 79.8612],
    description: 'Main construction site' 
  },
  { 
    name: 'Site B - Kegalle', 
    position: [7.2533, 80.3434],
    description: 'Bridge construction' 
  },
  { 
    name: 'Site C - Jaffna', 
    position: [9.6615, 80.0255],
    description: 'Road development project' 
  },
  { 
    name: 'Site D - Kandy', 
    position: [7.2906, 80.6337],
    description: 'Road improvement work' 
  },
  { 
    name: 'Site E - Gampaha', 
    position: [7.1070, 80.2220],
    description: 'Building foundation work' 
  },
];

function MonitorMap() {
  return (
    <Card className="mt-4 mb-4 shadow-sm">
      <Card.Header as="h5" className="bg-primary text-white">
        <i className="fas fa-map-marked-alt me-2"></i> Construction Sites Monitoring
      </Card.Header>
      <Card.Body className="p-0" style={{ height: '200px' }}>
        <MapContainer 
          center={[7.8731, 80.7718]} 
          zoom={7} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {monitoringSites.map((site, index) => (
            <Marker key={index} position={site.position}>
              <Popup>
                <div>
                  <h6>{site.name}</h6>
                  <p className="mb-1">{site.description}</p>
                  <small>
                    Lat: {site.position[0].toFixed(4)}, 
                    Lng: {site.position[1].toFixed(4)}
                  </small>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card.Body>
    </Card>
  );
}

export default MonitorMap;
