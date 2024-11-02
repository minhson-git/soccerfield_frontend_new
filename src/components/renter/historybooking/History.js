// src/pages/History.js
import React from 'react';
import './History.css';

const historyData = [
  { id: 1, fieldName: 'Sân A', date: '2024-10-05', time: '17:00 - 19:00', branch: 'Chi nhánh 1', price: '200,000 VND' },
  { id: 2, fieldName: 'Sân B', date: '2024-10-10', time: '18:00 - 20:00', branch: 'Chi nhánh 2', price: '300,000 VND' },
  { id: 3, fieldName: 'Sân C', date: '2024-10-15', time: '16:00 - 18:00', branch: 'Chi nhánh 1', price: '250,000 VND' },
];

const History = () => {
  return (
    <div className="history">
      <h2>Lịch Sử Đặt Sân</h2>
      <ul className="history-list">
        {historyData.map((item) => (
          <li key={item.id} className="history-item">
            <div className="history-field">
              <span className="field-name">{item.fieldName}</span> - <span className="branch">{item.branch}</span>
            </div>
            <div className="history-details">
              <p>Ngày: {item.date}</p>
              <p>Giờ: {item.time}</p>
              <p>Giá: {item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
