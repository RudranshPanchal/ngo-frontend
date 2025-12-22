import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser } = useAppContext();
  
  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has required role
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default ProtectedRoute;