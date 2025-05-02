// src/components/Login.js
import { useState } from 'react';
import axios from 'axios';
import './Login.module.css';


function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      onLogin(response.data.access);
    } catch {
        setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login to CollabSphere</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., admin"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g., 2025DEVChallenge"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600 text-center">
        Test users: <br />
        - Admin: admin / 2025DEVChallenge <br />
        - User: newuser / 2025DEVChallenge
      </p>
    </div>
  );
}

export default Login;