import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getFoodBanks = () => api.get('/foodbanks');
export const getFoodBank = (id) => api.get(`/foodbanks/${id}`);
export const createFoodBank = (data) => api.post('/foodbanks', data);
export const updateFoodBankData = (id, text) => api.post(`/foodbanks/${id}`, { text });
export const findRecommendations = (text) => api.post('/find_recommendations', { text });

export default api;
