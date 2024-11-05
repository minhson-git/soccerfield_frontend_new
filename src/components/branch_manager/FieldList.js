import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';

const FieldList = () => {
  const fields = [
    { id: 1, name: 'Field 1', size: '7-a-side' },
    { id: 2, name: 'Field 2', size: '7-a-side' },
    { id: 3, name: 'Field 3', size: '5-a-side' },
    { id: 4, name: 'Field 4', size: '5-a-side' },
    { id: 5, name: 'Field 5', size: '5-a-side' },
  ];

  const timeSlots = [
    "07:30 - 09:00", "09:30 - 11:00", "14:00 - 15:30", "16:30 - 18:00", 
    "18:30 - 20:00", "20:00 - 21:30"
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [bookings, setBookings] = useState([
    { fieldId: 1, day: 'Mon', time: "07:30 - 09:00", bookedBy: 'A. Quân' },
    { fieldId: 2, day: 'Tue', time: "14:00 - 15:30", bookedBy: 'A. Sơn' },
    { fieldId: 3, day: 'Wed', time: "16:30 - 18:00", bookedBy: 'A. Nam' },
    { fieldId: 4, day: 'Thu', time: "18:30 - 20:00", bookedBy: 'A. Đức' },
    { fieldId: 5, day: 'Fri', time: "20:00 - 21:30", bookedBy: 'A. Hiệp' },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeSlotStyle = (index) => {
    const colors = ['#FFDDC1', '#FFD1DC', '#C1E1FF', '#D1FFC1', '#FFF2C1', '#C1D1FF'];
    return {
      backgroundColor: colors[index % colors.length],
    };
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Weekly Field Booking Schedule
      </Typography>
      <Typography align="center" sx={{ marginBottom: 2 }}>
        Current Time: {currentTime.toLocaleString()}
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="field booking table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>Time Slot</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>Field</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={day} align="center" sx={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((slot, index) => (
              fields.map((field) => (
                <TableRow key={`${field.id}-${slot}`} hover>
                  <TableCell align="center" style={getTimeSlotStyle(index)}>{slot}</TableCell>
                  <TableCell align="center">{field.name} ({field.size})</TableCell>
                  {daysOfWeek.map((day) => {
                    const booking = bookings.find(b => b.fieldId === field.id && b.day === day && b.time === slot);
                    return (
                      <TableCell key={`${field.id}-${day}-${slot}`} align="center" sx={{
                        backgroundColor: booking ? '#FFB0B0' : '#C1FFC1',
                        fontWeight: booking ? 'bold' : 'normal',
                        color: booking ? 'red' : 'green',
                        transition: 'background-color 0.3s',
                      }}>
                        {booking ? booking.bookedBy : "Available"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FieldList;
