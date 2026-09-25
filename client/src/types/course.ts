import { User } from './user';

export interface Course {
  _id: string;
  title: string;
  description: string;
  owner: User | string;
  fileUrl: string;
  price: number;
  language: string;
  tags: string[];
  visibility?: 'public' | 'private';
  status: 'pending' | 'approved' | 'rejected';
  avgRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  purchasedAt?: string;
  purchaseStatus?: string;
}

export interface GetCoursesParams {
  q?: string;
  lang?: string;
  price?: 'free' | 'paid';
  sort?: 'rating' | 'latest';
  page?: number;
  limit?: number;
}

export interface GetCoursesResponse {
  courses: Course[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
