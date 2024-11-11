import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const FooterContainer = styled(Box)`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 27px 0;
  text-align: center;
  width: 100%;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Typography variant="body1">
          © {new Date().getFullYear()} Soccer Field Booking. All rights
          reserved.
        </Typography>
        <Typography variant="body2">
          Contact us: info@soccerfield.com | Follow us on
          <a
            href="https://facebook.com"
            target="_blank"
            style={{ color: "#ffcc00", marginLeft: "5px" }}
          >
            Facebook
          </a>
          ,
          <a
            href="https://twitter.com"
            target="_blank"
            style={{ color: "#ffcc00", marginLeft: "5px" }}
          >
            Twitter
          </a>
        </Typography>
      </FooterContainer>
    </>
  );
};

export default Footer;
