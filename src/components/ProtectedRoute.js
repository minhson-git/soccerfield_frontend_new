// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, userRole, children }) => {
  return allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
