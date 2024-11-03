import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/renter/sidebar/Sidebar';
import Booking from '../components/renter/booking/Booking';
import Header from '../components/renter/header/Header';
import './BookingField.css'

const BookingField = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className={`booking-page ${isSidebarClosed ? '' : 'expanded'}`}>
      <Header />
    <Sidebar isSidebarClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarClosed ? '' : 'expanded'}`}>
          <Booking/>
        </div>
        
    </div>
  );
};

export default BookingField;
