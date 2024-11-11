import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import axios from 'axios';
import { notification } from 'antd';

// Dữ liệu sân yêu thích (Giữ nguyên)
const favoriteFields = [
  {
    id: 1,
    name: 'Sân A',
    address: '123 Đường A, Quận 1',
    type: 'Sân 5 người',
    image: require('../../../assets/images/bernabeu.jpg')
  },
  {
    id: 5,
    name: 'Sân E',
    address: '102 Đường E, Quận 5',
    type: 'Sân 5 người',
    image: require('../../../assets/images/signal.jpg')
  },
];

const BaseUrl = process.env.REACT_APP_BASE_URL; // URL backend của bạn

const Booking = () => {
  const [fields, setFields] = useState([]); // Dữ liệu sân
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [uniqueBranches, setUniqueBranches] = useState([]); // Danh sách chi nhánh duy nhất
  const [uniqueFieldTypes, setUniqueFieldTypes] = useState([]); // Danh sách loại sân duy nhất

  const jwtToken = sessionStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/fields`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      });
      const fieldData = response?.data?.data?.content;
      setFields(fieldData);
      setUniqueBranches([...new Set(fieldData.map(field => field.branch.branchName))]);
      setUniqueFieldTypes([...new Set(fieldData.map(field => field.fieldType))]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching fields:', error);
      notification.error({ message: 'Failed to fetch fields data' });
      setIsLoading(false);
    }
  };

  const handleFieldClick = (field) => {
    navigate(`/user/booking/field/${field.fieldId}`, { state: { field } });
  };

  // Lọc danh sách sân dựa trên chi nhánh và loại sân được chọn
  const filteredFields = fields.filter(field => {
    return (
      (selectedBranch === 'All' || field.branch.branchName === selectedBranch) &&
      (selectedType === 'All' || field.fieldType === selectedType)
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-page">
      <div className="booking-content">
        <div className="fields-container">
         
          <div className="filter-section">
            <label>
              Branch: 
              <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                <option value="All">All</option>
                {uniqueBranches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </label>
            <label>
              Field Type:
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="All">All</option>
                {uniqueFieldTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Phần danh sách sân */}
          <div className="fields-section">
            {filteredFields.map(field => (
              <div key={field.fieldId} className="field-card" onClick={() => handleFieldClick(field)}>
                <div className="field-info">
                  <h3>{field.fieldType}</h3>
                  <p>Branch: {field.branch.branchName}</p>
                  <p>Address: {field.branch.address}</p>
                  <p>Price: {field.pricePerHour.toLocaleString()} VND/hour</p>
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
