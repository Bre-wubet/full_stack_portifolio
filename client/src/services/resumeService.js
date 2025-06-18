import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/resume';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const resumeService = {
  // Get current resume
  getResume: async () => {
    try {
      const response = await api.get('/resume');
      
      // Ensure we return a consistent object structure
      return {
        ...response.data,
        exists: response.data.exists ?? true
      };
    } catch (error) {
      console.error('Resume fetch error:', error);
      
      // If it's a 404 error, return a consistent object structure
      if (error.response?.status === 404) {
        return {
          exists: false,
          message: error.response.data.message
        };
      }
      
      // For other errors, return a consistent error structure
      return {
        exists: false,
        message: error.response?.data?.message || 'Failed to fetch resume',
        error: error.response?.data || error.message
      };
    }
  },

  // Upload new resume
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await api.post('/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return {
        ...response.data,
        exists: true
      };
    } catch (error) {
      console.error('Resume upload error:', error);
      throw {
        exists: false,
        message: error.response?.data?.message || 'Failed to upload resume',
        error: error.response?.data || error.message
      };
    }
  },

  // Delete current resume
  deleteResume: async () => {
    try {
      const response = await api.delete('/resume', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return {
        ...response.data,
        exists: false
      };
    } catch (error) {
      console.error('Resume delete error:', error);
      throw {
        exists: false,
        message: error.response?.data?.message || 'Failed to delete resume',
        error: error.response?.data || error.message
      };
    }
  }
};

export default resumeService; 