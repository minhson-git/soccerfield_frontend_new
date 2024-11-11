
import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';
import logo from '../../../assets/images/hero/logo.png'; // Path to the logo

const NavBarContainer = styled(Box)`
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.img`
  width: 150px;
  cursor: pointer;
`;

const NavItem = styled(ListItem)`
  color: white;
  font-size: 20px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    color: #ffcc00;
  }
`;

const NavBar = () => {
  return (
    <NavBarContainer>
     
      <Logo src={logo} alt="Soccer Field Logo" />

   
      <List style={{ display: 'flex' }}>
        <NavItem button>
          <ListItemText primary="Home" />
        </NavItem>
        <NavItem button>
          <ListItemText primary="About" />
        </NavItem>
        <NavItem button>
          <ListItemText primary="Contact" />
        </NavItem>
      </List>
    </NavBarContainer>
  );
};

export default NavBar;
