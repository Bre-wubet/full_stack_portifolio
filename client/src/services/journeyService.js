import API from '../api';

const journeyService = {
  getAllJourneys: async () => {
    const response = await API.get('/journeys');
    return response.data;
  },

  addJourney: async (journeyData) => {
    const response = await API.post('/journeys', journeyData);
    return response.data;
  },

  updateJourney: async (id, journeyData) => {
    const response = await API.put(`/journeys/${id}`, journeyData);
    return response.data;
  },

  deleteJourney: async (id) => {
    const response = await API.delete(`/journeys/${id}`);
    return response.data;
  }
};

export default journeyService;