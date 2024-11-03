import { UserOutlined } from "@ant-design/icons";
import {
  faBuilding,
  faClipboard,
  faFilePen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/branch":
        return "1";
      case "/field":
        return "2";
      case "/booking":
        return "3";
      case "/users":
        return "4";
      case "/role":
        return "5";
      default:
        return "1";
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-container">
        <div className="logo-circle">
          <img className="image" alt="Logo" src={logo} />
        </div>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey()]}>
        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faBuilding} />}>
          <Link to="/branch">Branch</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faClipboard} />}>
          <Link to="/field">Field</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FontAwesomeIcon icon={faFilePen} />}>
          <Link to="/booking">Booking</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/users">User</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FontAwesomeIcon icon={faStar} />}>
          <Link to="/role">Role</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
