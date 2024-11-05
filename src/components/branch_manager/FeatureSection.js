import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { FaFutbol, FaChartBar, FaUser } from 'react-icons/fa';

const FeatureSection = () => {
  const features = [
    {
      title: 'Field List Management',
      description: 'Easily manage all your football fields in one place.',
      icon: <FaFutbol size={40} />,
    },
    {
      title: 'Statistics Management',
      description: 'Track and analyze all your booking statistics effectively.',
      icon: <FaChartBar size={40} />,
    },
    {
      title: 'Customer Management',
      description: 'Keep track of customer information and bookings seamlessly.',
      icon: <FaUser size={40} />,
    },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f7f7f7', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333' }}>
        Our Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 5 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
                <Box sx={{ backgroundColor: '#e0f7fa', borderRadius: '50%', padding: 2, marginBottom: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: '600' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureSection;
