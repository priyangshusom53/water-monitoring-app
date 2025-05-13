import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './logout.css';

export default function Logout() {
   //const logout = useAuthStore(state => state.logout);
   //const navigate = useNavigate();

   // useEffect(() => {
   //    //logout();
   //    // Optional: redirect to login after 2 seconds
   //    //const timer = setTimeout(() => navigate('/login'), 2000);
   //    //return () => clearTimeout(timer);
   // }, [logout, navigate]);

   return (
      <div className="logout-container">
         <div className="logout-card">
            <h2 className="logout-title">You’ve Been Logged Out</h2>
            <p className="logout-message">Hope to see you again soon!</p>
            <Link to="/login" className="logout-link">
               Log In Again
            </Link>
         </div>
      </div>
   );
}
