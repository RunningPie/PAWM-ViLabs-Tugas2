// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

const ProtectedRoute = ({ element: Element }) => {
    const { isLoggedIn } = useAuth();
    
    // If user is not logged in, redirect to the login page
    return isLoggedIn ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
