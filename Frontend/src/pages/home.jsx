//import React from 'react';
import { Link } from 'react-router-dom';
import waterMeter from '../../assets/waterMeter.svg';

import './home.css';

export default function Home() {
   return (
      <div className="home-container">
         <img src={waterMeter} alt="Water Meter" className="home-icon" />

         <h1 className="home-title">Get Started</h1>

         <div className="home-buttons">
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-secondary">Log In</Link>
         </div>
      </div>
   );
}

