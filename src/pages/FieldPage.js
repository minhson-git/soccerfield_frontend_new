import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/branch_manager/Navbar';
import FieldList from '../components/branch_manager/FieldList';
import Footer from '../components/branch_manager/Footer'; 



const FieldPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, pt: 12, pb: 4 }}> 
        <FieldList />
      </Box>
      <Footer />
    </Box>
  );
};

export default FieldPage;
