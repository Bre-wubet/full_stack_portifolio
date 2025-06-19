import API from '../api';

const resumeService = {
  // Get current resume
  getResume: async () => {
    try {
      const response = await API.get('/resume');
      
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

      const response = await API.post('/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization header will be set by API interceptor if token exists
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
      const response = await API.delete('/resume');
      
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