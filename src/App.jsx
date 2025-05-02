// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import AccessControlDashboard from './components/AccessControlDashboard.jsx';
import Navbar from './components/Navbar.jsx';
import './App.module.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar token={token} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={token ? <Dashboard token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/access-control" element={token ? <AccessControlDashboard token={token} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;