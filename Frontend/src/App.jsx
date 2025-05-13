// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home.jsx';
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import PrivateRoute from './pages/privateRoute.jsx'
import Logout from './pages/logout.jsx'
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore.js';
import Loading from './components/loading.jsx';


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [])
  console.log({ authUser })

  if (isCheckingAuth && !authUser) {
    return <Loading />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={!authUser ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route path="/login"
          element={!authUser ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;