import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://192.168.29.155:5174/api/v1/').replace(/\/$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token auto attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// console.log('API URL:', API_BASE_URL);

export default api;