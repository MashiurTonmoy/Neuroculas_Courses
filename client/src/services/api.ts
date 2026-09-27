import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Firebase ID Token automatically to all API requests
api.interceptors.request.use(async (config) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const fallbackToken = localStorage.getItem('token');
      if (fallbackToken) {
        config.headers.Authorization = `Bearer ${fallbackToken}`;
      }
    }
  } catch (err) {
    console.error('Failed to attach Firebase token to request:', err);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
