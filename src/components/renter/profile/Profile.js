import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { notification } from 'antd'; // Import notification để thông báo lỗi

const BaseUrl = process.env.REACT_APP_BASE_URL;

function Profile() {
  const [userProfile, setUserProfile] = useState(null); // Sử dụng null thay vì [] vì không có dữ liệu ban đầu
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  
  const jwtToken = sessionStorage.getItem("access_token");
  const username = sessionStorage.getItem("username");

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
      console.log("Response data:", res?.data);

      setUserProfile(res?.data?.data || {}); // Lưu dữ liệu người dùng vào state
      setEditedUser(res?.data?.data || {}); // Cập nhật dữ liệu chỉnh sửa với thông tin ban đầu
    } catch (error) {
      console.error("Error fetching user profile:", error);
      notification.error({ message: "Failed to fetch user profile" });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveClick = () => {
    setUserProfile(editedUser);
    setIsEditing(false);
    // Gửi dữ liệu chỉnh sửa lên server nếu cần
  };

  const handleCancelClick = () => {
    setEditedUser(userProfile);
    setIsEditing(false);
  };

  if (!userProfile) {
    return <div>Loading...</div>; // Hiển thị thông báo loading khi dữ liệu chưa được lấy
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h2>Account Information</h2>
        <div className="profile-field">
          <label>Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.fullname|| ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userProfile.fullname}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Citizen ID:</label>
          {isEditing ? (
            <input
              type="text"
              name="cccd"
              value={editedUser.citizenId || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userProfile.citizenId}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Phone Number:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedUser.phone || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userProfile.phone}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email || ''}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userProfile.email}</span>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Lưu</button>
              <button onClick={handleCancelClick}>Hủy</button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick}>Edit Account</button>
              <button>Change Password</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
