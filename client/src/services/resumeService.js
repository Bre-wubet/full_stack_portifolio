import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const resumeService = {
  // Get current resume
  getResume: async () => {
    try {
      const response = await axios.get(`${API_URL}/resume`);
      return response.data;
    } catch (error) {
      // If it's a 404 error, throw the message from the server
      if (error.response?.status === 404) {
        throw new Error(error.response.data.message);
      }
      throw error.response?.data || error.message;
    }
  },

  // Upload new resume
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await axios.post(`${API_URL}/resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete current resume
  deleteResume: async () => {
    try {
      const response = await axios.delete(`${API_URL}/resume`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default resumeService; 