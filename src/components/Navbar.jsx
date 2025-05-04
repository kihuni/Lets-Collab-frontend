// src/components/Navbar.js
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import styles as a variable

function Navbar({ token, onLogout }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLink}>Lets-Collab</Link>
        {token ? (
          <div className={styles.navContainer}>
            <Link to="/" className={styles.navLink}>Dashboard</Link>
            <Link to="/access-control" className={styles.navLink}>Access Control</Link>
            <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
          </div>
        ) : (
          <span>Login to access features</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;