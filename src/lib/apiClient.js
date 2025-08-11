import axios from 'axios';

const baseURL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
        localStorage.removeItem('token');
      } catch {}
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;


