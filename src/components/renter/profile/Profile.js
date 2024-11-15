import React, { useState, useEffect } from 'react';
import { notification, Modal, Form, Input, Button } from 'antd';
import axios from 'axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwtToken = sessionStorage.getItem("access_token");
  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username]);

  const fetchUserProfile = async (username) => {
    if (!username) return;

    try {
      const res = await axios.get(`${BaseUrl}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUserProfile(res?.data?.data || {});
    } catch (error) {
      console.error("Error fetching user profile:", error);
      notification.error({ message: "Failed to fetch user profile" });
    }
  };


  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue({
      fullname: userProfile.fullname,
      citizenId: userProfile.citizenId,
      username: userProfile.username,
      phone: userProfile.phone,
      email: userProfile.email,
    });
  };

  const handleBack = () => {
    navigate("/user/home");
  }

  const handleSaveClick = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${BaseUrl}/users/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      notification.success({ message: res?.data?.message || "Profile updated successfully" });
      window.sessionStorage.removeItem("username")
      window.sessionStorage.setItem("username", res?.data?.data?.username)
      setUserProfile(values);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      notification.error({ message: error?.response?.data?.message || "Failed to update profile" });
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    form.resetFields();
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h2>Account Information</h2>
        <div className="profile-field">
          <label>Full Name:</label>
          <span>{userProfile.fullname}</span>
        </div>
        <div className="profile-field">
          <label>Citizen ID:</label>
          <span>{userProfile.citizenId}</span>
        </div>
        <div className="profile-field">
          <label>Username:</label>
          <span>{userProfile.username}</span>
        </div>
        <div className="profile-field">
          <label>Phone Number:</label>
          <span>{userProfile.phone}</span>
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <span>{userProfile.email}</span>
        </div>
        <div className="profile-actions">
          <Button onClick={handleEditClick}>Edit Account</Button>
          <Button onClick={handleBack}>Back to Home</Button>
        </div>
      </div>

      <Modal
        title="Edit Profile"
        visible={isEditing}
        onOk={() => form.submit()}
        onCancel={handleCancelClick}
        okText="Save"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <Form form={form} onFinish={handleSaveClick} layout="vertical">
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Citizen ID"
            name="citizenId"
            rules={[{ required: true, message: "Please enter citizen ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter phone number" },
              { pattern: /^[0-9]+$/, message: "Phone must be a number" },
              { max: 10, message: "Phone must be at most 10 digits" },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Profile;
