export interface User {
  id?: string;
  _id?: string;
  firebaseUid?: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  role: 'user' | 'admin';
  avatar?: string;
  about?: string;
  createdAt?: string;
}

export interface UserWithStats extends User {
  createdAt?: string;
  uploadCount: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
