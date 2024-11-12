import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const BaseUrl = process.env.REACT_APP_BASE_URL;

const BookingForm = () => {
    const jwtToken = sessionStorage.getItem("access_token");
    const fieldId = sessionStorage.getItem("fieldId"); 
    const location = useLocation();
    const { field } = location.state || {}; 
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const navigate = useNavigate();


    const timeSlots = [];
    for (let hour = 6; hour < 24; hour++) {
        const startTime = `${String(hour).padStart(2, '0')}:00`;
        const endTime = `${String(hour + 1).padStart(2, '0')}:30`;
        timeSlots.push({ start: startTime, end: endTime });
    }

    const today = new Date().toISOString().split("T")[0];

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem('userId');
        if (!userId || !selectedDate || !selectedTime || !fieldId) return;

        // Split start and end time
        const [startTime, endTime] = selectedTime.split(" - ");
        const formattedStartTimeSlot = `${selectedDate}T${startTime}:00`; // ISO format
        const formattedEndTimeSlot = `${selectedDate}T${endTime}:00`;     // ISO format

        const bookingData = {
            user: {
                userId,
            },
            field: {
                fieldId,
            },
            startTime: formattedStartTimeSlot,
            endTime: formattedEndTimeSlot,
            bookingDate: selectedDate,
            status: false,
        };
        console.log(bookingData);
        try {
            const response = await axios.post(`${BaseUrl}/bookings`, bookingData, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.status === 201) {
                notification.success({message: response?.data?.message});
                navigate("/user/history");
                
            } else {
                notification.error({message: "Failed to book field"});
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="booking-form">
            <h2>Booking Field</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Time:
                    <select value={selectedTime} onChange={handleTimeChange} required>
                        <option value="">Time Frame</option>
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={`${slot.start} - ${slot.end}`}>
                                {slot.start} - {slot.end}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Date
                    <input type="date" value={selectedDate} onChange={handleDateChange} min={today} required />
                </label>
                    
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default BookingForm;
