// Profile.js
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Nguyen Van A',
    cccd: '123456789012',
    phone: '0123456789',
    email: 'nguyenvana@example.com'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveClick = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
        <div className="profile-wrapper">
      <h2>Thông tin cá nhân</h2>
      <div className="profile-field">
        <label>Tên:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div className="profile-field">
        <label>CCCD:</label>
        {isEditing ? (
          <input
            type="text"
            name="cccd"
            value={editedUser.cccd}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.cccd}</span>
        )}
      </div>
      <div className="profile-field">
        <label>Số điện thoại:</label>
        {isEditing ? (
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.phone}</span>
        )}
      </div>
      <div className="profile-field">
        <label>Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Lưu</button>
            <button onClick={handleCancelClick}>Hủy</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Chỉnh sửa tài khoản</button>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
