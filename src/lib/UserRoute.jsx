import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function UserRoute() {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   if (!token) {
//     return <Navigate to="/signin" replace state={{ from: location }} />;
//   }

  return <Outlet />;
}

export default UserRoute;


