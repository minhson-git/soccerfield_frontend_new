import React from 'react';
import { AppBar, Toolbar, Typography, Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const value = location.pathname === '/' ? 0 : location.pathname === '/fields' ? 1 : location.pathname === '/statistics' ? 2 : location.pathname === '/customer-info' ? 3 : 4;

  return (
    <AppBar position="fixed" sx={{ background: '#222', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
          DQS Field Management System
        </Typography>
        <Tabs value={value} sx={{ marginLeft: 'auto' }}>
          <Tab label="Home" component={Link} to="/manager/home" sx={{ color: 'white', '&.Mui-selected': { color: '#FFD700' } }} />
          <Tab label="Fields" component={Link} to="/manager/fields" sx={{ color: 'white', '&.Mui-selected': { color: '#FFD700' } }} />
          <Tab label="Statistics" component={Link} to="/manager/statistics" sx={{ color: 'white', '&.Mui-selected': { color: '#FFD700' } }} />
          <Tab label="Customer" component={Link} to="/manager/customer-infor" sx={{ color: 'white', '&.Mui-selected': { color: '#FFD700' } }} />
          <Tab label="Account" component={Link} to="/account" sx={{ color: 'white', '&.Mui-selected': { color: '#FFD700' } }} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
