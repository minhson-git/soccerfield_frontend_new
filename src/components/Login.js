import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import "./Login.css"; // Import file CSS
import axios from "axios";
import { Input, notification } from "antd";
import Spinner from "./admin/global/Spinner";

const Login = ({ user, onLogin, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = { username, password };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        data,
        config
      );
      notification.success({
        description: res.data.message,
      });
      window.sessionStorage.setItem("access_token", res.data.data.token);
      window.sessionStorage.setItem("username", username);
      window.sessionStorage.setItem("userId", res.data.data.userId); // Lưu userId vào sessionStorage

      if (res?.data?.data?.role !== "admin") {
        navigate("/user/home");
      } else {
        navigate("/admin/branchs");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: "Login Error",
        description: "User name or password is incorrect",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        // <div className="div">
        <div className="container">
          <h2 className="title">User Account</h2>
          {user ? (
            <>
              <p className="text">Welcome, {user.name}!</p>
              <button className="button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="formContainer">
              <p className="text">Please log in to access your account</p>
              <div className="inputGroup">
                <Form>
                  <Form.Item
                    style={{ fontSize: "16px" }}
                    label="User Name"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter user name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="User Name"
                      size="medium"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ fontSize: "16px" }}
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter password",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      size="medium"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </Form.Item>
                </Form>
                <button className="loginButton" onClick={handleLogin}>
                  Log In
                </button>
              </div>
              <div className="signupContainer">
                <p className="text">Don't have an account?</p>
                <Link to="/signup" className="signupLink">
                  <button className="signupButton">Sign Up</button>
                </Link>
              </div>
            </div>
          )}
        </div>
        // </div>
      )}
    </>
  );
};

export default Login;
