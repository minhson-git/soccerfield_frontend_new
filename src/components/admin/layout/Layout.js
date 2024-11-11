import { useState } from "react";
import { Layout, Button, theme, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../home/Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const { Header } = Layout;
const { Title } = Typography;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getPageName = (path) => {
    switch (path) {
      case "/admin/branchs":
        return "Branch";
      case "/admin/fields":
        return "Field";
      case "/admin/bookings":
        return "Booking";
      case "/admin/users":
        return "User";
      case "/admin/roles":
        return "Role";
      default:
        return "Home";
    }
  };

  const pageName = getPageName(pathname);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 0,
          height: "100vh",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          {/* <Navigate to="/admin/branch" /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "14px",
                width: 64,
                height: 64,
              }}
            />
            <Title level={3} style={{ margin: "0 16px" }}>
              {pageName}
            </Title>
          </div>
        </Header>
        <Layout style={{ margin: "55px 16px" }}>
          <Content style={{ padding: 16, overflow: "auto" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
