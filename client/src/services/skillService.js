import API from '../api';

const skillService = {
  getAllSkills: async () => {
    const response = await API.get('/skills');
    return response.data;
  },

  addSkill: async (skillData) => {
    const response = await API.post('/skills', skillData);
    return response.data;
  },

  updateSkill: async (id, skillData) => {
    const response = await API.put(`/skills/${id}`, skillData);
    return response.data;
  },

  deleteSkill: async (id) => {
    const response = await API.delete(`/skills/${id}`);
    return response.data;
  }
};

export default skillService;