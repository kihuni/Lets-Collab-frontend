// src/components/Login.js
import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css'; // Import styles as a variable

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
    <div className={styles.container}>
      <h2 className={styles.title}>Login to Let's-Collab</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="e.g., admin"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="e.g., 2025DEVChallenge"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.info}>
        Test users: <br />
        - Admin: admin / 2025DEVChallenge <br />
        - User: newuser / 2025DEVChallenge
      </p>
    </div>
  );
}

export default Login;