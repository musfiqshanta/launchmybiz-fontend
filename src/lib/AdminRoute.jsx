import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const AdminRoute = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  // Check for admin token in localStorage
  const checkAdminToken = () => {
    const adminToken = localStorage.getItem('adminToken');

    
    const hasToken = !!adminToken;
    
    
    return hasToken;
  };

  useEffect(() => {
    
    
    // Check token immediately
    const tokenExists = checkAdminToken();
    
    setHasToken(tokenExists);
    setLoading(false);

    // Check token periodically (every 5 seconds)
    const intervalId = setInterval(() => {
      const tokenExists = checkAdminToken();
    
      if (!tokenExists && hasToken) {
        // Token was removed, redirect to login
      
        window.location.href = '/admin-login';
      }
      setHasToken(tokenExists);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [hasToken]);

  // Show loading while initializing
  if (loading) {
   
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect if no token
  if (!hasToken) {
   
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }


  return <Outlet />;
};

export default AdminRoute;
