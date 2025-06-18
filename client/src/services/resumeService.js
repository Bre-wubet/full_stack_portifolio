import API from '../api';

// Get the base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return 'https://brwubet.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

// Create axios instance with default config
const api = API.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Log request in development
    if (!import.meta.env.PROD) {
      console.log('Making request to:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (!import.meta.env.PROD) {
      console.log('Response received:', response.data);
    }
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const getResume = async () => {
  try {
    const response = await API.get('/resume');
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return { exists: false, message: 'No resume found' };
    }
    throw error;
  }
};

const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await API.post('/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteResume = async () => {
  try {
    const response = await API.delete('/resume');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getResume,
  uploadResume,
  deleteResume
};