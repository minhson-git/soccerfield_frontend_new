import React, { useState, useEffect } from 'react';

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
      ...styles.timeSlot,
      backgroundColor: colors[index % colors.length],
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Weekly Field Booking Schedule</h2>
      <div style={styles.currentTime}>Current Time: {currentTime.toLocaleString()}</div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Time Slot</th>
            <th>Field</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            fields.map((field) => (
              <tr key={`${field.id}-${slot}`}>
                <td style={getTimeSlotStyle(index)}>{slot}</td>
                <td style={styles.fieldName}>{field.name} ({field.size})</td>
                {daysOfWeek.map((day) => {
                  const booking = bookings.find(b => b.fieldId === field.id && b.day === day && b.time === slot);
                  return (
                    <td key={`${field.id}-${day}-${slot}`} style={booking ? styles.bookedSlot : styles.availableSlot}>
                      {booking ? booking.bookedBy : "Available"}
                    </td>
                  );
                })}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '10px',
    color: '#2C3E50',
  },
  currentTime: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#333',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  timeSlot: {
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
  },
  fieldName: {
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
  },
  bookedSlot: {
    backgroundColor: '#FFC107',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  availableSlot: {
    backgroundColor: '#e0e0e0',
    padding: '10px',
    textAlign: 'center',
    color: '#666',
  },
};

export default FieldList;
