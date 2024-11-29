import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  // Retrieve the token from cookies
  const token = Cookies.get('token'); // Replace 'authToken' with your cookie's key name

  if (!token) {
    // Redirect to login if the token is missing
    return <Navigate to="/login" replace />;
  }

  // Render the protected children if the token exists
  return children;
};

export default ProtectedRoute;
