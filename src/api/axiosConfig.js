import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Đổi URL này thành URL của backend Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;