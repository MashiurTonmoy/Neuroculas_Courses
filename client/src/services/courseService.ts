import api from './api';
import { Course, GetCoursesParams, GetCoursesResponse } from '../types/course';

export const courseService = {
  async getCourses(params?: GetCoursesParams): Promise<GetCoursesResponse> {
    const res = await api.get<GetCoursesResponse>('/courses', { params });
    return res.data;
  },

  async getCourse(id: string): Promise<Course> {
    const res = await api.get<Course>(`/courses/${id}`);
    return res.data;
  },

  async createCourse(formData: FormData): Promise<{ message: string; course: Course }> {
    const res = await api.post('/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  async downloadCourse(id: string): Promise<{ fileUrl: string }> {
    const res = await api.get<{ fileUrl: string }>(`/courses/${id}/download`);
    return res.data;
  },

  async deleteCourse(id: string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/courses/${id}`);
    return res.data;
  },

  async getMyPurchases(): Promise<Course[]> {
    const res = await api.get<Course[]>('/courses/my-purchases');
    return res.data;
  },

  async getMyUploads(): Promise<Course[]> {
    const res = await api.get<Course[]>('/courses/my-uploads');
    return res.data;
  },

  async enrollFree(id: string): Promise<{ message: string; courseId?: string; alreadyEnrolled?: boolean }> {
    const res = await api.post(`/courses/${id}/enroll-free`);
    return res.data;
  },
};
