import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== role) {
      return <Navigate to="/unauthorized" />;
    }
    return children ? children : <Outlet />;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
