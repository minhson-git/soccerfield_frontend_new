// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>Soccer Field Booking</h1>
            <nav>
                <Link to="/">Trang chủ</Link>
                <Link to="/bookingfield">Đặt sân</Link>
                <Link to="/profile">Tài khoản</Link>
            </nav>
        </header>
    );
};

export default Header;
