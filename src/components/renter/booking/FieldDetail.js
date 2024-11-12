import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./FieldDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
  faFutbol,
  faCar,
  faClock,
  faLockOpen,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { getUniqueImage } from "../../utils/imageSelector";

const FieldDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const field = location.state?.field;
  const [fieldImage, setFieldImage] = useState(null);

  useEffect(() => {
    // Kiểm tra xem hình ảnh đã được lưu trong sessionStorage chưa
    const savedImage = sessionStorage.getItem(`fieldImage-${field.fieldId}`);

    if (savedImage) {
      // Nếu đã có hình ảnh trong sessionStorage, dùng hình ảnh đó
      setFieldImage(savedImage);
    } else {
      // Nếu chưa có, chọn một hình ảnh ngẫu nhiên và lưu vào sessionStorage
      const randomImage = getUniqueImage();
      setFieldImage(randomImage);
      sessionStorage.setItem(`fieldImage-${field.fieldId}`, randomImage);
    }
  }, [field.fieldId]);

  if (!field) {
    return <p>Cannot find field.</p>;
  }

  const handleBookClick = () => {
    navigate(`/user/booking/field/${field.fieldId}/book`, { state: { field } });
    sessionStorage.setItem("fieldId", field.fieldId);
  };

  const isBooked = field.status === true || field.status === "true";

  return (
    <div className="field-detail">
      <h2 className="field-name">{field.fieldType}</h2>
      <h3 className="branch">{field.branch.branchName}</h3>
      <div className="image-carousel">
        <Carousel showThumbs={false} infiniteLoop>
          {field.images?.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${field.fieldType} Image ${index}`} />
            </div>
          )) || (
            <div>
              <img src={fieldImage} alt={`${field.fieldType} Default Image`} />
            </div>
          )}
        </Carousel>
      </div>

      {/* Field information and amenities */}
      <div className="field-info1">
        <div className="field-info-left">
          <h3>Information</h3>
          <div className="info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
            <p>Address: {field.branch.address}</p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faFutbol} className="info-icon" />
            <p>Field Type: {field.fieldType}</p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faDollarSign} className="info-icon" />
            <p>Price: {field.pricePerHour.toLocaleString()} VND/hour</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="field-info-right">
          <h3>Amenities</h3>
          <div className="info-item">
            <FontAwesomeIcon icon={faCar} className="info-icon" />
            <p>Free Parking</p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faClock} className="info-icon" />
            <p>Opening Hours: 6:00 - 00:00</p>
          </div>
          <div className="info-item">
            {isBooked ? (
              <FontAwesomeIcon icon={faLock} className="info-icon" />
            ) : (
              <FontAwesomeIcon icon={faLockOpen} className="info-icon" />
            )}
            <p>Status: {isBooked ? "Booked" : "Available"}</p>
          </div>
        </div>
      </div>

      {/* Booking section */}
      <div className="booking-section">
        <p className="field-price">
          Price: {field.pricePerHour.toLocaleString()} VND/hour
        </p>
        <button className="booking-button" onClick={handleBookClick}>
          Book Field
        </button>
      </div>
    </div>
  );
};

export default FieldDetail;
