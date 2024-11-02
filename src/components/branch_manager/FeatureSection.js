import React from 'react';

const FeatureSection = () => {
  return (
    <section style={styles.featureSection}>
      <h2>Our Features</h2>
      <div style={styles.featureList}>
        <div style={styles.featureItem}>Field List Managment</div>
        <div style={styles.featureItem}>Statistics Management</div>
        <div style={styles.featureItem}>Customer Management</div>
      </div>
    </section>
  );
};

const styles = {
  featureSection: {
    padding: '50px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontFamily: "'sans-serif'",  

  },
  featureList: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  featureItem: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }
};

export default FeatureSection;
