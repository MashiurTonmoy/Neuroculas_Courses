import api from './api';
import { Course } from '../types/course';
import { AdminStats } from '../types/purchase';

export const adminService = {
  async getPending(): Promise<{ total: number; courses: Course[] }> {
    const res = await api.get<{ total: number; courses: Course[] }>('/admin/pending');
    return res.data;
  },

  async approveCourse(id: string): Promise<{ message: string; course: Course }> {
    const res = await api.patch<{ message: string; course: Course }>(`/admin/approve/${id}`);
    return res.data;
  },

  async rejectCourse(id: string, reason?: string): Promise<{ message: string; course: Course }> {
    const res = await api.patch<{ message: string; course: Course }>(`/admin/reject/${id}`, { reason });
    return res.data;
  },

  async getStats(): Promise<AdminStats> {
    const res = await api.get<AdminStats>('/admin/stats');
    return res.data;
  },
};
