// src/api.js
import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return 'https://brwubet.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor with proper error handling
API.interceptors.request.use(
  (config) => {
    // Only log in development
    if (!import.meta.env.PROD) {
      console.log('Making request to:', config.url, {
        method: config.method,
        headers: config.headers,
        data: config.data
      });
    }
    
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ensure CORS headers are set
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept';
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    // Only log in development
    if (!import.meta.env.PROD) {
      console.log('Response received:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // Redirect to login page in production
      if (import.meta.env.PROD) {
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
