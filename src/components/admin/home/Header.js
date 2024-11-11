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
      case "/admin/branch":
        setSelectedKey("1");
        break;
      case "/admin/field":
        setSelectedKey("2");
        break;
      case "/admin/booking":
        setSelectedKey("3");
        break;
      case "/admin/users":
        setSelectedKey("4");
        break;
      case "/admin/role":
        setSelectedKey("5");
        break;
      default:
        setSelectedKey("1");
    }
  }, [location.pathname]);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/admin/branch":
        return "1";
      case "/admin/field":
        return "2";
      case "/admin/booking":
        return "3";
      case "/admin/users":
        return "4";
      case "/admin/role":
        return "5";
      default:
        return "1";
    }
  };

  const menuItems = [
    {
      key: "1",
      icon: <FontAwesomeIcon icon={faBuilding} />,
      label: <Link to="/admin/branch">Branch</Link>,
    },
    {
      key: "2",
      icon: <FontAwesomeIcon icon={faClipboard} />,
      label: <Link to="/admin/field">Field</Link>,
    },
    {
      key: "3",
      icon: <FontAwesomeIcon icon={faFilePen} />,
      label: <Link to="/admin/booking">Booking</Link>,
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">User</Link>,
    },
    {
      key: "5",
      icon: <FontAwesomeIcon icon={faStar} />,
      label: <Link to="/admin/role">Role</Link>,
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
