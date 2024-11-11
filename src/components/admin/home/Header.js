import { UserOutlined } from "@ant-design/icons";
import {
  faBuilding,
  faClipboard,
  faFilePen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/hero/logo.png";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    switch (location.pathname) {
      case "/admin/branchs":
        setSelectedKey("1");
        break;
      case "/admin/fields":
        setSelectedKey("2");
        break;
      case "/admin/bookings":
        setSelectedKey("3");
        break;
      case "/admin/users":
        setSelectedKey("4");
        break;
      case "/admin/roles":
        setSelectedKey("5");
        break;
      default:
        setSelectedKey("1");
    }
  }, [location.pathname]);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/admin/branchs":
        return "1";
      case "/admin/fields":
        return "2";
      case "/admin/bookings":
        return "3";
      case "/admin/users":
        return "4";
      case "/admin/roles":
        return "5";
      default:
        return "1";
    }
  };

  const menuItems = [
    {
      key: "1",
      icon: <FontAwesomeIcon icon={faBuilding} />,
      label: <Link to="/admin/branchs">Branch</Link>,
    },
    {
      key: "2",
      icon: <FontAwesomeIcon icon={faClipboard} />,
      label: <Link to="/admin/fields">Field</Link>,
    },
    {
      key: "3",
      icon: <FontAwesomeIcon icon={faFilePen} />,
      label: <Link to="/admin/bookings">Booking</Link>,
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">User</Link>,
    },
    {
      key: "5",
      icon: <FontAwesomeIcon icon={faStar} />,
      label: <Link to="/admin/roles">Role</Link>,
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo-container">
        <div className="logo-circle">
          <img className="image" alt="Logo" src={logo} />
        </div>
      </div>
      <Menu
        key={menuItems.key}
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
