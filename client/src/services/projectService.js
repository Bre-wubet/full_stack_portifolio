import API from '../api';

const projectService = {
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