import axios from 'axios';

const baseURL = import.meta.env?.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // Check for admin token first (for admin routes)
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  // Check for user token (for user routes)
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  // Use admin token if available, otherwise use user token
  const token = adminToken || userToken;
  
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        // Check if this was an admin route by looking at the URL
        const isAdminRoute = error.config?.url?.includes('/api/admin/');
        
        if (isAdminRoute) {
          // Remove admin tokens and redirect to admin login
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          if (typeof window !== 'undefined') {
            window.location.href = '/admin-login';
          }
        } else {
          // Remove user tokens and redirect to user login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (typeof window !== 'undefined') {
            window.location.href = '/signin';
          }
        }
      } catch {}
    }
    return Promise.reject(error);
  }
);

export default api;


