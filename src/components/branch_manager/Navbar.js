import React from 'react';
import { FaHome, FaFutbol, FaChartBar, FaUser } from 'react-icons/fa'; 

const Navbar = () => {
  const currentPath = window.location.pathname;

  return (
    <nav style={styles.navbar}>
      <div>
        <h1 style={styles.logoText}>DQS Field Management System</h1>
      </div>
      <ul style={styles.navList}>
        <li>
          <a href="/" 
             style={{ 
               ...styles.navLink, 
               ...(currentPath === '/' && styles.activeLink) 
             }}>
            <FaHome style={styles.icon} /> Home
          </a>
        </li>
        <li>
          <a href="/fields" 
             style={{ 
               ...styles.navLink, 
               ...(currentPath === '/fields' && styles.activeLink) 
             }}>
            <FaFutbol style={styles.icon} /> Fields
          </a>
        </li>
        <li>
          <a href="/statistics" 
             style={{ 
               ...styles.navLink, 
               ...(currentPath === '/statistics' && styles.activeLink) 
             }}>
            <FaChartBar style={styles.icon} /> Statistics
          </a>
        </li>
        <li>
          <a href="/customer-info" 
             style={{ 
               ...styles.navLink, 
               ...(currentPath === '/customer-info' && styles.activeLink) 
             }}>
            <FaUser style={styles.icon} /> Customer
          </a>
        </li>
        <li>
          <a href="/account" 
             style={{ 
               ...styles.navLink, 
               ...(currentPath === '/account' && styles.activeLink) 
             }}>
            <FaUser style={styles.icon} /> Account
          </a>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#222',
    padding: '8px 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    fontFamily: "'sans-serif'",  
  },
  logoText: {
    color: 'white', 
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '25px',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    transition: 'color 0.3s ease, transform 0.2s ease',
  },
  icon: {
    marginRight: '5px',
  },
  activeLink: {
    color: '#32CD32',
    fontWeight: 'bold',
    transform: 'scale(1.1)',
    //textShadow: '0px 0px 8px rgba(255, 215, 0, 0.8)',
  }
};

export default Navbar;
