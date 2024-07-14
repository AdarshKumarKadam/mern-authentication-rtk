import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ component: Component, roles }) => {
  const { isAuthenticated ,userInfo} = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return Component;
};

export default ProtectedRoute;
