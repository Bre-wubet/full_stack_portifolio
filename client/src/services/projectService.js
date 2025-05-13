import API from '../api';

const projectService = {
  uploadImage: async (file) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Please login as admin to upload images');
      }

      // Validate file type and size
      if (!file || !file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size should not exceed 5MB');
      }
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await API.post('/projects/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
          // Authorization header is automatically added by API interceptor
        },
      });
      
      if (!response.data.imageUrl) {
        throw new Error('No image URL received from server');
      }
      
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response?.status === 401) {
        throw new Error('Please login as admin to upload images');
      } else if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'Invalid image file or no file provided');
      } else if (error.message) {
        throw error; // Throw validation errors directly
      }
      throw new Error('Failed to upload image. Please try again.');
    }
  },

  getAllProjects: async () => {
    try {
      const response = await API.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  addProject: async (projectData) => {
    try {
      const response = await API.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error adding project:', error);
      if (error.response?.status === 401) {
        throw new Error('Please login as admin to add projects');
      }
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await API.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      if (error.response?.status === 401) {
        throw new Error('Please login as admin to delete projects');
      }
      throw error;
    }
  },
};

export default projectService;