import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // xử lý đăng ký tài khoản
    console.log('Signup data:', formData);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create an Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p style={styles.text}>
        Already have an account?{' '}
        <Link to="/account" style={styles.link}>
          Log In here
        </Link>
      </p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '40px',
    maxWidth: '400px',
    margin: '50px auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#2C3E50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px 30px',
    background: 'linear-gradient(45deg, #30cfd0, #330867)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
    transition: 'background 0.3s',
  },
  text: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#333',
    textAlign: 'center',
  },
  link: {
    color: '#30cfd0',
    textDecoration: 'none',
  },
};

export default Signup;
