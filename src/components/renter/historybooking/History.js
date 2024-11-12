import React, { useEffect, useState } from 'react';
import { Button, Table, notification } from "antd";
import axios from "axios";
import './History.css'; 
import { useNavigate } from 'react-router-dom';

const BaseUrl = process.env.REACT_APP_BASE_URL;

function History() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const jwtToken = sessionStorage.getItem("access_token");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchBookingHistory(userId);
    }
  }, [userId]);

  const fetchBookingHistory = async (userId) => {
    if (!userId) return;

    try {
      const res = await axios.get(`${BaseUrl}/bookings`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: { userId: userId },
      });
      console.log("Response data:", res?.data);

      const updatedBookingHistory = res?.data?.data?.content?.map((booking) => {
        const currentTime = new Date();
        const startTime = new Date(booking.startTime);
        const endTime = new Date(booking.endTime);

        if (currentTime > endTime) {
          booking.status = true;  
        }
        return booking;
      });

      setBookingHistory(updatedBookingHistory || []);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      notification.error({ message: "Failed to fetch booking history" });
    }
  };

  const columns = [
    {
      title: "Branch",
      dataIndex: ["field", "branch", "branchName"],
      key: "branch",
      align: "center",
      width: "20%",
    },
    {
      title: "Booking Date",  
      dataIndex: "bookingDate",
      key: "bookingDate",
      align: "center",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
      width: "20%",
    },
    {
      title: "Start Time", 
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
      render: (text) =>
        new Date(text).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      width: "20%",
    },
    {
      title: "End Time",  
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
      render: (text) =>
        new Date(text).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      width: "20%",
    },
    {
      title: "Field Type",  
      dataIndex: ["field", "fieldType"],
      key: "fieldType",
      align: "center",
      width: "20%",
    },
    {
      title: "Price", 
      dataIndex: ["field", "pricePerHour"],
      key: "pricePerHour",
      align: "center",
      render: (text) =>
        text.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (status ? "Completed" : "Booked"),
      width: "15%",
    },
  ];

  return (
    <div className="history-container">
      <h2 className="table-title">Booking History</h2>
      <div className="table-container">
        <Table
        style={{ marginBottom : "10px" }}
          columns={columns}
          dataSource={Array.isArray(bookingHistory) ? bookingHistory : []}
          rowKey="bookingId"
        />  
        <div className='history-actions'>
          <Button onClick={() =>navigate("/user/home")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

export default History;