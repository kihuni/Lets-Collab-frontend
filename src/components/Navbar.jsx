// src/components/Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.module.css';

function Navbar({ token, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Lets-Collab</Link>
        {token ? (
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/access-control" className="hover:underline">Access Control</Link>
            <button onClick={onLogout} className="hover:underline">Logout</button>
          </div>
        ) : (
          <span>Login to access features</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;