// axiosConfig.js interceptor

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Set your API base URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminData')?.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
