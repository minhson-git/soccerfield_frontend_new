import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';

const BaseUrl = process.env.REACT_APP_BASE_URL;

const BookingForm = () => {
    const jwtToken = sessionStorage.getItem("access_token");
    const fieldId = sessionStorage.getItem("fieldId"); // Get fieldId from session
    const location = useLocation();
    const { field } = location.state || {}; // field data passed through the route
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [userData, setUserData] = useState(null);

    // Các khung giờ từ 6:00 đến 24:00, mỗi khung là 1 tiếng 30 phút
    const timeSlots = [];
    for (let hour = 6; hour < 24; hour++) {
        const startTime = `${String(hour).padStart(2, '0')}:00`;
        const endTime = `${String(hour + 1).padStart(2, '0')}:30`;
        timeSlots.push({ start: startTime, end: endTime });
    }

    const today = new Date().toISOString().split("T")[0];

    // Fetch user data from session storage
    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    // Function to fetch user data from the backend if needed
    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${BaseUrl}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            setUserData(response.data.data); // Assuming the response structure
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

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

        // Prepare booking data using selected date, time, and pre-filled information
        const bookingData = {
            userId: userId, // userId from session
            fieldId: fieldId, // fieldId from session
            date: selectedDate, 
            timeSlot: selectedTime,
            fieldType: field?.fieldType || "", // If field is available from location state, use it
            pricePerHour: field?.pricePerHour || 0, // Use pricePerHour from field
        };

        try {
            const response = await axios.post(`${BaseUrl}/bookings`, bookingData, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Đặt sân thành công!");
            } else {
                console.error("Đặt sân thất bại!");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };

    return (
        <div className="booking-form">
            <h2>Đặt sân</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Thời gian:
                    <select value={selectedTime} onChange={handleTimeChange} required>
                        <option value="">Chọn khung giờ</option>
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={`${slot.start} - ${slot.end}`}>
                                {slot.start} - {slot.end}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Ngày:
                    <input type="date" value={selectedDate} onChange={handleDateChange} min={today} required />
                </label>
                    
                <button type="submit">Xác nhận đặt</button>
            </form>
        </div>
    );
};

export default BookingForm;
