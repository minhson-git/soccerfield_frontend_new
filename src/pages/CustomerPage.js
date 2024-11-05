import React, { useState } from 'react';
import { Box, TextField, Typography, Container } from '@mui/material';
import Navbar from '../components/branch_manager/Navbar';
import CustomerData from '../components/branch_manager/CustomerData'; 
import Footer from '../components/branch_manager/Footer'; 

const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <br></br>
      <Container sx={{ flexGrow: 1, paddingTop: '60px', paddingBottom: '40px' }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: '30px', fontWeight: '600', color: '#333' }}>
          Customer Management
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#30cfd0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#30cfd0',
              },
            },
          }}
        />

        <CustomerData searchTerm={searchTerm} />
      </Container>
      <Footer />
    </Box>
  );
};

export default CustomerPage;
