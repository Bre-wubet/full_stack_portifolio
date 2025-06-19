// src/api.js
import axios from 'axios';

const getBaseURL = () => {
  const isDevelopment = import.meta.env.MODE === 'development';
  const productionUrl = '/api';
  const developmentUrl = 'http://localhost:5000/api';

  // Log the current environment and URL for debugging
  console.log('Current environment:', import.meta.env.MODE);
  console.log('Using API URL:', isDevelopment ? developmentUrl : productionUrl);

  return isDevelopment ? developmentUrl : productionUrl;
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
    // Log all requests in development
    if (import.meta.env.MODE === 'development') {
      console.log('Making request to:', config.url, {
        baseURL: config.baseURL,
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
    // Log all successful responses in development
    if (import.meta.env.MODE === 'development') {
      console.log('Response received:', {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    // Always log errors
    console.error('Response error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export default API;
