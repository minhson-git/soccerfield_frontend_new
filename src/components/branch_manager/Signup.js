import { Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BaseUrl = process.env.REACT_APP_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { citizenId, email, fullname, password, phone, username } = values;
    const data = { citizenId, email, fullname, password, phone, username };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await axios.post(`${BaseUrl}/users`, data, config);
      notification.success({ message: res?.data?.message });
      navigate("/login");
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create an Account</h2>
      <Form onFinish={handleSubmit} style={styles.form}>
        <Form.Item
          style={{ fontSize: "16px" }}
          label="Citizen ID"
          name="citizenId"
          rules={[{ required: true, message: "Please enter citizen ID" }]}
        >
          <Input placeholder="Citizen ID" size="medium" />
        </Form.Item>
        <Form.Item
          style={{ fontSize: "16px" }}
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter user name",
            },
            {
              min: 3,
              message: "Username must be at least 3 characters",
            },
          ]}
        >
          <Input placeholder="User Name" size="medium" />
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
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
        >
          <Input.Password placeholder="Password" size="medium" />
        </Form.Item>
        <Form.Item
          style={{ fontSize: "16px" }}
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email",
            },
            {
              type: "email",
              message: "The input is not valid email!",
              pattern: new RegExp(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            },
          ]}
        >
          <Input placeholder="Email" size="medium" />
        </Form.Item>
        <Form.Item
          style={{ fontSize: "16px" }}
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="Full Name" size="medium" />
        </Form.Item>
        <Form.Item
          style={{ fontSize: "16px" }}
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone" }]}
        >
          <Input placeholder="Phone" size="medium" />
        </Form.Item>
        <button type="submit" style={styles.button} onSubmit={handleSubmit}>
          Sign Up
        </button>
      </Form>
      <p style={styles.text}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Log In here
        </Link>
      </p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "40px",
    maxWidth: "400px",
    margin: "50px auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
    color: "#2C3E50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
  },
  inputGroup: {
    width: "100%",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "7px",
    background: "linear-gradient(45deg, #30cfd0, #330867)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
    transition: "background 0.3s",
  },
  text: {
    marginTop: "20px",
    fontSize: "1rem",
    color: "#333",
    textAlign: "center",
  },
  link: {
    color: "#30cfd0",
    textDecoration: "none",
  },
};

export default Signup;
