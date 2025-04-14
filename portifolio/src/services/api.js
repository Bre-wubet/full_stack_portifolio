import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Project services
export const projectService = {
  getAllProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  createProject: async (projectData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await api.post('/projects', projectData, config);
    return response.data;
  },
  updateProject: async (id, projectData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await api.put(`/projects/${id}`, projectData, config);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};