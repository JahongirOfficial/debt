import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

// ProtectedRoute component to prevent admin users from accessing regular user routes
export function ProtectedRoute({ children, allowedRoles = ['user'] }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has the required role
    if (!user) {
      // User not authenticated, redirect to login
      navigate('/login');
      return;
    }

    // Check if user role is allowed to access this route
    if (!allowedRoles.includes(user.role)) {
      // User role not allowed, redirect to appropriate dashboard
      if (user.role === 'admin') {
        // Admin users should not access regular user routes
        navigate('/panel/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, allowedRoles, navigate]);

  // Show nothing while checking authentication
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // User is authenticated and has the required role, render children
  return children;
}