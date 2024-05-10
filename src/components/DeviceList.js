import React, { useState, useEffect } from 'react';
import './device-card.css';

function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Simulated device data (replace with actual API fetch)
    const simulatedDevices = [
      { id: 1, name: 'Wemos D1 (DHT22)', isActive: true, lastConnected: '2024-05-10 12:30:00' },
      { id: 2, name: 'Wemos D1 (BH1750)', isActive: false, lastConnected: '2024-05-09 18:45:00' },
      // Add more devices as needed...
    ];

    // Set devices state with simulated data
    setDevices(simulatedDevices);
  }, []);

  return (
    <div>
      <h2>Device Status</h2>
      <div>
        {devices.map(device => (
          <div key={device.id} className="device-card">
            <p className="device-name">{device.name}</p>
            <p className="device-status">Status: {device.isActive ? 'Active' : 'Inactive'}</p>
            <p>Last Connected: {device.lastConnected}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeviceList;