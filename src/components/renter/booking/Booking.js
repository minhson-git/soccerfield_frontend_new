import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import axios from 'axios';
import { notification } from 'antd';
import { getUniqueImage } from '../../utils/imageSelector';

const BaseUrl = process.env.REACT_APP_BASE_URL;

const Booking = () => {
  const [fields, setFields] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueBranches, setUniqueBranches] = useState([]);
  const [uniqueFieldTypes, setUniqueFieldTypes] = useState([]);

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

      
      </div>
    </div>
  );
};

export default Booking;