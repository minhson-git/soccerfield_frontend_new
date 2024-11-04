import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/renter/Footer";
import Header from "../components/renter/header/Header";
const Home = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
