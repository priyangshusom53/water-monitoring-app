
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './login.css';

export default function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const { isLoggingIn, login } = useAuthStore()
   const handleSubmit = e => {
      e.preventDefault();
      // TODO: call your login API
      login({
         email: username,
         password: password
      })
      console.log({ username, password });
   };

   return (
      <div className="login-container">
         <form className="login-card" onSubmit={handleSubmit}>
            <h2 className="login-title">Log In</h2>

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

            <button type="submit" className="login-button">
               Log In
            </button>

            {/* New signup prompt */}
            <div className="signup-prompt">
               Don’t have an account?{' '}
               <Link to="/signup" className="signup-link">
                  Sign up
               </Link>
            </div>
         </form>
      </div>
   );
}
