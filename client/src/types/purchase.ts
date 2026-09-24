import { User } from './user';
import { Course } from './course';

export interface Purchase {
  _id: string;
  buyer: User;
  course: Course;
  amount: number;
  paymentId?: string;
  status: 'paid' | 'free';
  createdAt: string;
}

export interface AdminStats {
  users: number;
  courses: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  purchases: number;
  reviews: number;
  totalRevenue: number;
  recentPurchases: Purchase[];
}
