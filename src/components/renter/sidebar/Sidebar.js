import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarClosed, toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <nav className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
      <header>
        <div className="image-text">
          <span className="image"></span>
          <div className="text logo-text">
            <span className="name">Renter</span>
            <span className="profession">Booking Field</span>
          </div>
        </div>
        <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <a href="/user/home">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Home</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="/user/profile">
                <i className="bx bx-user icon"></i>
                <span className="text nav-text">Profile</span>
              </a>
            </li>
            <li className="nav-link">
              <Link to="/user/history">
                <i className="bx bx-time icon"></i>
                <span className="text nav-text">History</span>
              </Link>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="" onClick={toggleDarkMode}>
            <div className="sun-moon">
              <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} icon`}></i>
            </div>
            <span className="mode-text text">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="toggle-switch">
              <span className={`switch ${isDarkMode ? "active" : ""}`}></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
