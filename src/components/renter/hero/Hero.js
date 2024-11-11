import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/images/hero/pexels-photo-399187.jpeg";
import NavBar from "./NavBar";
import Footer from "../footer/Footer";
import "./Hero.css";

const HeroSection = styled(Box)`
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Hero = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleBookNow = () => {
    setShowNotification(true);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <HeroSection>
        <NavBar />
        <Box textAlign="center">
          <Typography
            variant="h2"
            component="h1"
            className="hero-title"
            gutterBottom
            style={{ color: "white" }}
          >
            Welcome to Striker Arena
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            className="hero-subtitle"
            gutterBottom
            style={{ color: "white" }}
          >
            Quickly and easily reserve your soccer field at any branch.
            Hassle-free bookings for individuals and teams!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="btn-book-now"
            onClick={handleBookNow}
          >
            Book Now
          </Button>

          {showNotification && (
            <Box mt={3} className="notification">
              <Typography variant="h6" gutterBottom>
                Please Sign In Before Booking
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}
                style={{ marginRight: "10px" }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Box>
      </HeroSection>
      <Footer />
    </>
  );
};

export default Hero;
