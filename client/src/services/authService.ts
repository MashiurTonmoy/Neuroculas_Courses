import api from './api';
import { AuthResponse } from '../types/user';

export const authService = {
  async register(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register', data);
    return res.data;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', data);
    return res.data;
  },
};
