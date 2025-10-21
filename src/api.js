import axios from 'axios';

const API_URL = 'https://nurture-backend-onc1.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const health = {
  submitAssessment: (data) => api.post('/health/assessment', data),
  getHistory: () => api.get('/health/history'),
};

export default api;