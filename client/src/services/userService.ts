import api from './api';
import { UserWithStats } from '../types/user';

export const userService = {
  async getUsers(query?: string): Promise<UserWithStats[]> {
    const res = await api.get<UserWithStats[]>('/users', {
      params: { q: query },
    });
    return res.data;
  },
};
