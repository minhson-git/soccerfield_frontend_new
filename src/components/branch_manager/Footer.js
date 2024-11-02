import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.infoSection}>
            <h2 style={styles.companyName}>DQS Soccer Field Management</h2>
            <p style={styles.slogan}>Excellence in field management and customer service</p>
          </div>
          <div style={styles.contactSection}>
            <div style={styles.contactItem}>
              <FaPhone style={styles.icon} />
              <a href="tel:0925790880" style={styles.link}>0925790880</a>
            </div>
            <div style={styles.contactItem}>
              <FaEnvelope style={styles.icon} />
              <a href="mailto:duinguyen88@gmail.com" style={styles.link}>duinguyen88@gmail.com</a>
            </div>
            <div style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.icon} />
              <p style={styles.text}>Office: 280 Luong Dinh Cua, An Phu, Thu Duc, Tp. HCM.</p>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>&copy; 2024 DQS Soccer Field Management. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#f0f0f0',
    padding: '40px 0',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
  },
  infoSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  companyName: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#f0f0f0',
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  slogan: {
    fontSize: '1rem',
    color: '#aaa',
    marginBottom: '20px',
  },
  contactSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '1.2rem',
    color: '#4CAF50',  
  },
  link: {
    color: '#f0f0f0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  text: {
    color: '#f0f0f0',
    fontSize: '1rem',
  },
  copyright: {
    marginTop: '20px',
    borderTop: '1px solid #4CAF50',
    paddingTop: '20px',
    fontSize: '0.9rem',
    color: '#aaa',
  },
};

export default Footer;
