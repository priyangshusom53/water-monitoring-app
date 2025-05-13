import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import DeviceController from '../components/deviceController';
import { use } from 'react';
import { io } from 'socket.io-client';

// Placeholder SVG icon (a little black tab)
const PlaceholderIcon = () => (
   <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#222"
      xmlns="http://www.w3.org/2000/svg"
   >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
   </svg>
);

export default function Dashboard() {
   // This would come from your store/API

   const navigate = useNavigate();
   const { logout } = useAuthStore();
   const devices = [
      { id: 1, name: 'Meter A' },
      { id: 2, name: 'Meter B' },
      { id: 3, name: 'Meter C' },
      { id: 4, name: 'Meter D' },
   ];

   const [selected, setSelected] = useState(0);
   const [detail, setDetail] = useState(null);

   const socketRef = useRef();
   const [flow, setFlow] = useState(0);
   const [threshold, setThreshold] = useState('');
   const [status, setStatus] = useState('stopped');

   useEffect(() => {
      socketRef.current = io('http://localhost:5001');

      socketRef.current.on('flowUpdate', val => {
         setFlow(val);
         setStatus('running');
      });

      socketRef.current.on('thresholdReached', t => {
         setStatus(`stopped (threshold ${t} reached)`);
      });

      socketRef.current.on('thresholdSet', t => {
         setStatus(`running (threshold set to ${t})`);
      });

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   const start = () => {
      socketRef.current.emit('startPump');
      setStatus('running');
   };

   const stop = () => {
      socketRef.current.emit('stopPump');
      setStatus('stopped');
   };

   const applyThreshold = () => {
      const t = parseFloat(threshold);
      if (!isNaN(t)) socketRef.current.emit('setThreshold', t);
      setThreshold('');
   };


   const handleLogout = () => {
      logout();
      navigate('/login', { replace: true });
   };


   return (
      <div className="dashboard-container">
         <header className="dashboard-header">
            <h1 className="dashboard-title">Your Devices</h1>
            <button onClick={handleLogout} className="logout-button">
               Log Out
            </button>
         </header>

         <div className="device-grid">
            {devices.map(device => (
               <div
                  key={device.id}
                  onClick={() => {
                     setSelected(device.id);
                  }}
                  className={`device-card ${device.online ? '' : 'offline'}`}>
                  <PlaceholderIcon />
                  <div className="device-name">{device.name}</div>
               </div>
            ))}
         </div>
         <div className="dash">
            <h1>Water Meter Dashboard</h1>
            <div className="status">Status: <strong>{status}</strong></div>
            <div className="flow">Current Flow: <strong>{flow} L</strong></div>

            <div className="controls">
               <button onClick={start}>Start</button>
               <button onClick={stop}>Stop</button>
            </div>

            <div className="threshold">
               <input
                  type="number"
                  placeholder="Threshold (L)"
                  value={threshold}
                  onChange={e => setThreshold(e.target.value)}
               />
               <button onClick={applyThreshold}>Set Threshold</button>
            </div>
         </div>

      </div>
   );
}
