import api from './api';
import { GetReviewsResponse, Review } from '../types/review';

export const reviewService = {
  async getReviews(courseId: string): Promise<GetReviewsResponse> {
    const res = await api.get<GetReviewsResponse>(`/courses/${courseId}/reviews`);
    return res.data;
  },

  async createReview(courseId: string, data: { rating: number; comment?: string }): Promise<{ message: string; review: Review }> {
    const res = await api.post(`/courses/${courseId}/reviews`, data);
    return res.data;
  },
};
