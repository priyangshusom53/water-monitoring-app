import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';

export default function Signup() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirm, setConfirm] = useState('');

   const { signup, isSigningUp } = useAuthStore()

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== confirm) {
         alert('Passwords do not match');
         return;
      }
      // TODO: call your signup API
      signup({
         email: username,
         password: password
      })

      console.log({ username, password });
   };

   return (
      <div className="signup-container">
         <form className="signup-card" onSubmit={handleSubmit}>
            <h2 className="signup-title">Sign Up</h2>

            <label htmlFor="username">Username</label>
            <input
               id="username"
               type="text"
               value={username}
               onChange={e => setUsername(e.target.value)}
               required
            />

            <label htmlFor="password">Password</label>
            <input
               id="password"
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               required
            />

            <label htmlFor="confirm">Confirm Password</label>
            <input
               id="confirm"
               type="password"
               value={confirm}
               onChange={e => setConfirm(e.target.value)}
               required
            />

            <button type="submit" className="signup-button">
               {isSigningUp ? "Loading..." : "Sign Up"}
            </button>

            <div className="login-prompt">
               Already a user?{' '}
               <Link to="/login" className="login-link">
                  Log in
               </Link>
            </div>
         </form>
      </div>
   );
}
