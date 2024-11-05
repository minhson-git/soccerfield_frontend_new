import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#222', 
        color: '#f0f0f0', 
        padding: '40px 0', 
        textAlign: 'center' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F0F0F0', textAlign: 'left' }}>
              DQS Soccer Field Management
            </Typography>
            <Typography variant="body1" sx={{ color: '#aaa', marginBottom: 2, textAlign: 'left' }}>
              Excellence in field management and customer service
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} justifyContent="right">
              <Grid item>
                <Link href="tel:0925790880" sx={{ display: 'flex', alignItems: 'center', color: '#f0f0f0', textDecoration: 'none' }}>
                  <FaPhone style={{ color: 'FFD700', marginRight: '8px' }} />
                  0925790880
                </Link>
              </Grid>
              <Grid item>
                <Link href="mailto:duinguyen88@gmail.com" sx={{ display: 'flex', alignItems: 'center', color: '#f0f0f0', textDecoration: 'none' }}>
                  <FaEnvelope style={{ color: 'FFD700', marginRight: '8px' }} />
                  duinguyen88@gmail.com
                </Link>
              </Grid>
              <Grid item>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#f0f0f0' }}>
                  <FaMapMarkerAlt style={{ color: 'FFD700', marginRight: '8px' }} />
                  Office: 280 Luong Dinh Cua, An Phu, Thu Duc, Tp. HCM.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4, borderTop: '1px solid #FFD700', paddingTop: 2 }}>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            &copy; 2024 DQS Soccer Field Management. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
