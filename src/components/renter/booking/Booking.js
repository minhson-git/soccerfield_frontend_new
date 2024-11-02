import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import bernabeu from '../../../assets/images/bernabeu.jpg';
import liverpoolBanner from '../../../assets/images/Liverpool-Banner.png';
import oldTrafford from '../../../assets/images/Old_Trafford_inside_20060726_1.jpg';
import parcDesPrinces from '../../../assets/images/parc-des-princes.jpeg';
import signal from '../../../assets/images/signal.jpg';

const fields = [
  {
    id: 1,
    name: "Sân A",
    branch: "Chi nhánh 1",
    address: "123 Đường A, Quận 1",
    type: "Sân 5 người",
    price: "200,000 VND/giờ",
    image: bernabeu
  },
  {
    id: 2,
    name: "Sân B",
    branch: "Chi nhánh 2",
    address: "456 Đường B, Quận 2",
    type: "Sân 7 người",
    price: "300,000 VND/giờ",
    image: liverpoolBanner
  },
  {
    id: 3,
    name: "Sân C",
    branch: "Chi nhánh 1",
    address: "789 Đường C, Quận 3",
    type: "Sân 5 người",
    price: "250,000 VND/giờ",
    image: oldTrafford
  },
  {
    id: 4,
    name: "Sân D",
    branch: "Chi nhánh 3",
    address: "101 Đường D, Quận 4",
    type: "Sân 7 người",
    price: "350,000 VND/giờ",
    image: parcDesPrinces
  },
  {
    id: 5,
    name: "Sân E",
    branch: "Chi nhánh 2",
    address: "102 Đường E, Quận 5",
    type: "Sân 5 người",
    price: "220,000 VND/giờ",
    image: signal
  }
];
const favoriteFields = [
  {
    id: 1,
    name: 'Sân A',
    address: '123 Đường A, Quận 1',
    type: 'Sân 5 người',
    image: bernabeu
  },
  {
    id: 5,
    name: 'Sân E',
    address: '102 Đường E, Quận 5',
    type: 'Sân 5 người',
    image: signal
  },
];

const Booking = () => {
  const [selectedBranch, setSelectedBranch] = useState('Tất cả');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const navigate = useNavigate();

  const handleFieldClick = (field) => {
    navigate(`/field/${field.id}`, { state: { field } });
  };

  const filteredFields = fields.filter(field => {
    return (
      (selectedBranch === 'Tất cả' || field.branch === selectedBranch) &&
      (selectedType === 'Tất cả' || field.type === selectedType)
    );
  });

  return (
    <div className="booking-page">
    <div className="booking-content">
        <div className="fields-container">
            {/* Phần bộ lọc */}
            <div className="filter-section">
                <label>
                    Chi nhánh:
                    <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                    <option value="Tất cả">Tất cả</option>
                    <option value="Chi nhánh 1">Chi nhánh 1</option>
                    <option value="Chi nhánh 2">Chi nhánh 2</option>
                    <option value="Chi nhánh 3">Chi nhánh 3</option>
            </select>
                </label>
                <label>
                    Loại sân:
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="Tất cả">Tất cả</option>
                    <option value="Sân 5 người">Sân 5 người</option>
                    <option value="Sân 7 người">Sân 7 người</option>
            </select>
                </label>
            </div>

            {/* Phần danh sách sân */}
            <div className="fields-section">
                {filteredFields.map(field => (
                    <div key={field.id} className="field-card" onClick={() => handleFieldClick(field)}>
                        <img src={field.image} alt={field.name} className="field-image" />
                        <div className="field-info">
                            <h3>{field.name}</h3>
                            <p>Chi nhánh: {field.branch}</p>
                            <p>Địa chỉ: {field.address}</p>
                            <p>Loại: {field.type}</p>
                            <p>Giá: {field.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Phần favorite slider nằm bên phải */}
        <div className="favorite-slider">
            <h2>Sân được yêu thích</h2>
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
                emulateTouch
            >
                {favoriteFields.map(favorite => (
                    <div key={favorite.id} className="favorite-card">
                        <img src={favorite.image} alt={favorite.name} className="favorite-image" />
                        <div className="favorite-info">
                            <h4>{favorite.name}</h4>
                            <p>{favorite.address}</p>
                            <p>{favorite.type}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    </div>
     
</div>
  );
}

export default Booking;
