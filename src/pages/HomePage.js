import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/branch_manager/HeroSection';
import FeatureSection from '../components/branch_manager/FeatureSection';
import ImageSlider from '../components/branch_manager/ImageSlider';
import Navbar from '../components/branch_manager/Navbar';
import Footer from '../components/branch_manager/Footer';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <HeroSection />
        <Box sx={{ mt: 4 }}>
          <FeatureSection />
        </Box>
        <Box sx={{ mt: 4 }}>
          <ImageSlider />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
