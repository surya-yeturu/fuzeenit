import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    return Promise.reject({ ...error, message });
  }
);

export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getFeatured: () => api.get('/courses/featured'),
  getBySlug: (slug) => api.get(`/courses/${slug}`),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

export const resourceAPI = {
  getAll: (params) => api.get('/resources', { params }),
  getBySlug: (slug) => api.get(`/resources/${slug}`),
};

export const enquiryAPI = {
  create: (data) => api.post('/enquiries', data),
};

export const contactAPI = {
  create: (data) => api.post('/contact', data),
};

export default api;
