export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface UserWithStats extends User {
  createdAt?: string;
  uploadCount: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
