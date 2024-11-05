import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './Account.css';

const Account = ({ user, onLogin, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <div className="accountContainer">
      <Typography variant="h4" className="title">
        User Account
      </Typography>
      {user ? (
        <>
          <Typography variant="body1" className="text">Welcome, {user.name}!</Typography>
          <Button variant="contained" color="primary" onClick={onLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" className="text">Please log in to access your account</Typography>
          <div className="inputGroup">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
              Log In
            </Button>
          </div>
          <div className="forgotPasswordContainer">
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password?
            </Link>
          </div>
          <Divider sx={{ my: 2 }} />
          <div className="signupContainer">
            <Typography variant="body2" className="text">Don't have an account?</Typography>
            <Link to="/signup" className="signupButton">
              <Button variant="outlined" color="secondary" fullWidth>
                Sign Up
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
