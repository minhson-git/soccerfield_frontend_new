import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './FieldDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDollarSign, faFutbol, faCar, faClock } from '@fortawesome/free-solid-svg-icons';



const FieldDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const field = location.state?.field;

    if (!field) {
        return <p>Cannot find field.</p>;
    }

    const handleBookClick = () => {
        navigate(`/user/booking/field/${field.fieldId}/book`, { state: { field } });
        window.sessionStorage.setItem("fieldId", field.fieldId);
    };

    
    return (
        <div className="field-detail">
            <h2 className="field-name">{field.fieldType}</h2>
            <h3 className="branch">{field.branch.branchName}</h3> 
            <div className="image-carousel">
                <Carousel showThumbs={false} infiniteLoop>
                    {field.images?.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`${field.fieldType} Image ${index + 1}`} />
                        </div>
                    )) || (
                        <div>
                            <img src={field.image} alt={`${field.fieldType} Default Image`} />
                        </div>
                    )}
                </Carousel>
            </div>

            {/* Thông tin chi tiết và tiện ích */}
            <div className="field-info1">
                <div className="field-info-left">
                    <h3>Thông tin</h3>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
                        <p>Địa chỉ: {field.branch.address}</p>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faFutbol} className="info-icon" />
                        <p>Loại sân: {field.fieldType}</p>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faDollarSign} className="info-icon" />
                        <p>Giá: {field.pricePerHour.toLocaleString()} VND/giờ</p>
                    </div>
                </div>

                {/* Tiện ích bên phải */}
                <div className="field-info-right">
                    <h3>Tiện ích</h3>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faCar} className="info-icon" />
                        <p>Giữ xe miễn phí</p>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faClock} className="info-icon" />
                        <p>Giờ mở cửa: 6:00 - 00:00</p>
                    </div>
                </div>
            </div>

            {/* Phần chọn đặt sân */}
            <div className="booking-section">
                <p className="field-price">Giá: {field.pricePerHour.toLocaleString()} VND/giờ</p>
                <button className="booking-button" onClick={handleBookClick}>Đặt sân</button>
            </div>
        </div>
    );
};

export default FieldDetail;
