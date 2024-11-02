import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const FieldStatistic = () => {
  const [activeTab, setActiveTab] = useState("allTime");
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 1000); // Cập nhật mỗi giây
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getAllTimeData = () => {
    const currentYear = today.getFullYear();
    return {
      labels: ["2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: 'Total bookings from 2020 to 2024',
          backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 0.5)", currentYear === 2024 ? "rgba(255, 159, 64, 0.5)" : "rgba(255, 99, 132, 0.5)"], // Làm nổi bật cột năm hiện tại
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [8200, 8800, 8900, 9150, 7450], 
        },
      ],
    };
  };

  const getThisWeekData = () => {
    const currentDay = today.getDay(); 
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const data = [28, 26, 29, 30, 30, 30, 30]; // Số liệu mẫu
    return {
      labels: days,
      datasets: [
        {
          label: 'Total bookings per day (this week)',
          backgroundColor: days.map((day, index) => index === currentDay ? "rgba(75, 192, 192, 0.8)" : index < currentDay ? "rgba(75, 192, 192, 0.5)" : "rgba(75, 192, 192, 0.2)"), // Làm nổi bật cột ngày hiện tại và ẩn dữ liệu ngày sau
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.map((value, index) => index <= currentDay ? value : null), // Chỉ hiển thị dữ liệu đến cột ngày hiện tại
        },
      ],
    };
  };

  const getThisYearData = () => {
    const currentMonth = today.getMonth(); // Tháng hiện tại
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: 'Total bookings per month (this year)',
          backgroundColor: Array(12).fill().map((_, index) => index === currentMonth ? "rgba(255, 159, 64, 0.8)" : "rgba(255, 159, 64, 0.5)"),
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          data: [800, 720, 850, 900, 920, 870, 930, 930, 850, 910, null, null], 
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
      x: { 
        barThickness: 3, 
        maxBarThickness: 5, 
      }
    },
  };

  const formatDate = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    return `${day}, ${dayOfMonth}/${month}/${year}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>OVERVIEW STATISTIC CHART</h2>
      <p style={styles.subheading}>Statistical chart overview of data on the system</p>
      <p style={styles.datetime}>{formatDate(today)}</p>
      {/* Tabs */}
      <div style={styles.tabContainer}>
        <button
          style={activeTab === "allTime" ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick("allTime")}
        >
          All time
        </button>
        <button
          style={activeTab === "thisWeek" ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick("thisWeek")}
        >
          This week
        </button>
        <button
          style={activeTab === "thisYear" ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick("thisYear")}
        >
          This year
        </button>
      </div>
      {/* Chart */}
      <div style={styles.chartContainer}>
        <Bar
          data={
            activeTab === "allTime"
              ? getAllTimeData()
              : activeTab === "thisWeek"
              ? getThisWeekData()
              : getThisYearData()
          }
          options={chartOptions}
        />
      </div>
    </div>
  );
};

// styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
  },
  datetime: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '20px',
  },
  tabContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ddd',
    color: '#333',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#FFC107',
    color: '#333',
    cursor: 'pointer',
  },
  chartContainer: {
    position: 'relative',
    height: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default FieldStatistic;
