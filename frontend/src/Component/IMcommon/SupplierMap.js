import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const suppliers = [
    { name: 'Supplier A - Kandy', position: [7.2906, 80.6337] },
    { name: 'Supplier B - Kegalle', position: [7.2514, 80.3464] },
    { name: 'Supplier C - Kurunegala', position: [7.4863, 80.3622] },
  ];

function SupplierMap() {
  return (
    <div className="mt-4" style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[6.9271, 79.8612]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {suppliers.map((supplier, index) => (
          <Marker key={index} position={supplier.position}>
            <Popup>{supplier.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default SupplierMap;
