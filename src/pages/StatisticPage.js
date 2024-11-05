import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/branch_manager/Navbar';
import FieldStatistic from '../components/branch_manager/FieldStatistic';
import Footer from '../components/branch_manager/Footer'; 

const StatisticPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, paddingTop: '60px' }}>  
        <FieldStatistic />
      </Box>
      <Footer />
    </Box>
  );
};

export default StatisticPage;
