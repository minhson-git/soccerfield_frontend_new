import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // xử lý đăng ký tài khoản
    console.log('Signup data:', formData);
    navigate('/account'); 
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: '50px auto',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Create an Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
        Already have an account?{' '}
        <Link href="/account" color="primary">
          Log In here
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
