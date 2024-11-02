import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/account');
  };

  return (
    <div style={styles.hero} className="fade-in">
      <div style={styles.overlay}></div>
      <h1 style={styles.heroTitle}>Welcome to DQS Field Management System</h1>
      <p style={styles.heroSubtitle}>Manage your fields efficiently and effortlessly</p>
      <button style={styles.ctaButton} onClick={handleGetStartedClick}>
        Get Started
      </button>
    </div>
  );
};

const styles = {
  hero: {
    height: '100vh',
    backgroundImage: 'url(san9.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    position: 'relative', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '0 20px', 
    fontFamily: "'sans-serif'",  

  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1,
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    zIndex: 2, 
    margin: '0 0 10px', 
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    zIndex: 2, 
    margin: '0 0 20px', 
  },
  ctaButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#E5C100', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', 
    zIndex: 2, 
  },
};

export default HeroSection;
