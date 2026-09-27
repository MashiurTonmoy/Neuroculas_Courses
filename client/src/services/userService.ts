import api from './api';
import { User, UserWithStats } from '../types/user';

export interface GetUsersResponse {
  users: UserWithStats[];
  totalPages: number;
  totalUsers: number;
  page: number;
}

export const userService = {
  async getUsers(params?: { q?: string; page?: number; limit?: number } | string): Promise<GetUsersResponse> {
    const queryParams = typeof params === 'string' ? { q: params } : params;
    const res = await api.get<any>('/users', {
      params: queryParams,
    });
    if (Array.isArray(res.data)) {
      return {
        users: res.data,
        totalPages: 1,
        totalUsers: res.data.length,
        page: 1,
      };
    }
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
