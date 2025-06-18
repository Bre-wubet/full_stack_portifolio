// src/api.js
import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    // In production, use the same origin since client and server are on the same domain
    return '/api';
  }
  // In development, use the proxy configuration
  return '/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
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
