import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';

const FieldStatistic = () => {
  const [activeTab, setActiveTab] = useState("allTime");
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 1000);
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
          backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 99, 132, 0.5)", currentYear === 2024 ? "rgba(255, 159, 64, 0.5)" : "rgba(255, 99, 132, 0.5)"],
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
    const data = [28, 26, 29, 30, 30, 30, 30];
    return {
      labels: days,
      datasets: [
        {
          label: 'Total bookings per day (this week)',
          backgroundColor: days.map((day, index) => index === currentDay ? "rgba(75, 192, 192, 0.8)" : index < currentDay ? "rgba(75, 192, 192, 0.5)" : "rgba(75, 192, 192, 0.2)"),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.map((value, index) => index <= currentDay ? value : null),
        },
      ],
    };
  };

  const getThisYearData = () => {
    const currentMonth = today.getMonth();
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
        barThickness: 20,
        maxBarThickness: 30,
      },
    },
  };

  const formatDate = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    return `${day}, ${dayOfMonth}/${month}/${year}`;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Overview Statistic Chart
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Statistical chart overview of data on the system
      </Typography>
      <Typography variant="subtitle2" align="center" gutterBottom>
        {formatDate(today)}
      </Typography>
      <Paper sx={{ marginBottom: 2 }}>
        <Tabs value={activeTab} indicatorColor="primary" textColor="primary">
          <Tab
            label="All Time"
            onClick={() => handleTabClick("allTime")}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              ...(activeTab === 'allTime' && {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                fontWeight: 'bold',
              }),
            }}
          />
          <Tab
            label="This Week"
            onClick={() => handleTabClick("thisWeek")}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              ...(activeTab === 'thisWeek' && {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                fontWeight: 'bold',
              }),
            }}
          />
          <Tab
            label="This Year"
            onClick={() => handleTabClick("thisYear")}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
              ...(activeTab === 'thisYear' && {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                fontWeight: 'bold',
              }),
            }}
          />
        </Tabs>
      </Paper>
      <Box sx={{ height: '400px', bgcolor: 'background.paper', padding: 2, borderRadius: 1, boxShadow: 2 }}>
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
      </Box>
    </Container>
  );
};

export default FieldStatistic;
