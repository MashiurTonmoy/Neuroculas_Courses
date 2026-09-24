import { User } from './user';

export interface Review {
  _id: string;
  course: string;
  reviewer: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface GetReviewsResponse {
  totalReviews: number;
  avgRating: number;
  reviews: Review[];
}
