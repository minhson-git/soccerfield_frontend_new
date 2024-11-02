import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const Account = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addEventListener = () => {
    window.addEventListener("keydown", 13)
    login()
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {username, password})
      console.log(res)
      if(res){
        alert('login successfully')
        navigate("/fields")
        sessionStorage.setItem("access_token", res.data.accessToken)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={styles.container} >
      <h2 style={styles.title}>User Account</h2>
      {user ? (
        <>
          <p style={styles.text}>Welcome, {user.name}!</p>
          <button style={styles.button} onClick={onLogout}>Logout</button>
        </>
      ) : (
        <div style={styles.formContainer}>
          <p style={styles.text}>Please log in to access your account</p>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              // value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button style={styles.button} onClick={login} onKeyDown={addEventListener}>Log In</button>
          </div>
          <div style={styles.forgotPasswordContainer}>
            <Link to="/forgot-password" style={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>
          <div style={styles.signupContainer}>
            <p style={styles.text}>Don't have an account?</p>
            <Link to="/signup" style={styles.signupLink}>
              <button style={styles.signupButton}>Sign Up</button>
            </Link>
          </div>
        </div>
      )}
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
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    marginTop: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },
  button: {
    padding: '12px 30px',
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s',
  },
  forgotPasswordContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  forgotPasswordLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '0.9rem',
  },
  signupContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  signupLink: {
    textDecoration: 'none',
  },
  signupButton: {
    padding: '10px 20px',
    background: '#ff7f50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s',
  },
};

export default Account;
