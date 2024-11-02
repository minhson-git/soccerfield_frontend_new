import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Hero from './components/renter/hero/Hero';
import BookingField from './pages/BookingField';
import Login from './components/Login';
import FieldDetail from './components/renter/booking/FieldDetail';
import Profile from './components/renter/profile/Profile';
import History from './components/renter/historybooking/History';
import Footer from './components/renter/Footer';
import Header from './components/renter/header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Giả định userRole là "renter" hoặc "branch_manager"
// (có thể lấy từ context hoặc redux tùy thuộc vào thiết kế hệ thống)
const userRole = "renter"; // Thay đổi giá trị này tùy thuộc vào quyền đăng nhập hiện tại

const App = () => {
  const location = useLocation();

  // Các đường dẫn không hiện Header
  const hideHeaderPaths = ['/', '/login', '/field/:fieldId', '/bookingfield'];

  return (
    <div className="app">
      <div className="content">
        {!hideHeaderPaths.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/field/:fieldId" element={<FieldDetail />} />

          {/* Đường dẫn cho renter */}
          <Route
            path="/bookingfield"
            element={
              <ProtectedRoute allowedRoles={['renter']} userRole={userRole}>
                <BookingField />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['renter']} userRole={userRole}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute allowedRoles={['renter']} userRole={userRole}>
                <History />
              </ProtectedRoute>
            }
          />

          {/* Đường dẫn cho branch_manager */}
          <Route
            path="/branch_manager/some-path"
            element={
              <ProtectedRoute allowedRoles={['branch_manager']} userRole={userRole}>
                {/* Component dành riêng cho branch_manager */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
