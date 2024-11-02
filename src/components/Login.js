import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css'; // Import file CSS

const Login = ({ user, onLogin, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <div className="container">
      <h2 className="title">User Account</h2>
      {user ? (
        <>
          <p className="text">Welcome, {user.name}!</p>
          <button className="button" onClick={onLogout}>Logout</button>
        </>
      ) : (
        <div className="formContainer">
          <p className="text">Please log in to access your account</p>
          <div className="inputGroup">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button className="loginButton" onClick={handleLogin}>Log In</button>
          </div>
          <div className="signupContainer">
            <p className="text">Don't have an account?</p>
            <Link to="/signup" className="signupLink">
              <button className="signupButton">Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
