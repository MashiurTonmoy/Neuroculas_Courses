import api from './api';
import { User, UserWithStats } from '../types/user';

export const userService = {
  async getUsers(query?: string): Promise<UserWithStats[]> {
    const res = await api.get<UserWithStats[]>('/users', {
      params: { q: query },
    });
    return res.data;
  },

  async getUserById(id: string): Promise<UserWithStats> {
    const res = await api.get<UserWithStats>(`/users/${id}`);
    return res.data;
  },

  async updateProfile(data: { name?: string; about?: string }): Promise<{ message: string; user: User }> {
    const res = await api.put<{ message: string; user: User }>('/users/profile', data);
    return res.data;
  },
};
