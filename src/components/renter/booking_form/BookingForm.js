import React from 'react';
import { useLocation } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
    const location = useLocation();
    const { field } = location.state || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đặt sân ở đây
        console.log("Đặt sân thành công!");
    };

    return (
        <div className="booking-form">
            <h2>Đặt {field?.name}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Thời gian:
                    <input type="datetime-local" required />
                </label>
                <button type="submit">Xác nhận đặt</button>
            </form>
        </div>
    );
};

export default BookingForm;