import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/fields');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url(san9.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        padding: '0 20px',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          zIndex: 2,
          marginBottom: 2,
          fontWeight: 'bold',
          fontSize: { xs: '2.5rem', sm: '3rem' },
          textTransform: 'uppercase',
        }}
      >
        Welcome to DQS Field Management System
      </Typography>
      <Typography
        variant="h5"
        sx={{
          zIndex: 2,
          marginBottom: 3,
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
        }}
      >
        Manage your fields efficiently and effortlessly
      </Typography>
      <Button
        variant="contained"
        onClick={handleGetStartedClick}
        sx={{
          zIndex: 2,
          backgroundColor: '#E5C100',
          color: '#000',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#c6a800',
          },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HeroSection;
