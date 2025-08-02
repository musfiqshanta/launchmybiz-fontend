import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const AdminRoute = () => {
  const [auth, setAuth] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await axios.get('https://lauchbackend-896056687002.europe-west1.run.app/api/admin/me', {
          withCredentials: true,  
        });

        if (data.admin?.role === 'admin' || data.admin?.role === 'superadmin') {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

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

  return auth ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default AdminRoute;
