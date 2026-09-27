import api from './api';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  updatePassword as firebaseUpdatePassword,
} from 'firebase/auth';
import { User } from '../types/user';

export const authService = {
  // Register new account via Firebase Auth & sync MongoDB profile
  async register(data: { name: string; email: string; password: string; about?: string }): Promise<{ user: User; idToken: string }> {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const firebaseUser = userCredential.user;

    // Set display name in Firebase Auth profile
    if (data.name) {
      await updateProfile(firebaseUser, { displayName: data.name });
    }

    // Send email verification link
    try {
      await sendEmailVerification(firebaseUser);
    } catch (err) {
      console.warn('Failed to send initial email verification:', err);
    }

    const idToken = await firebaseUser.getIdToken();
    localStorage.setItem('token', idToken);

    // Synchronize user profile in MongoDB database
    const syncRes = await api.post<{ user: User }>('/auth/sync', {
      name: data.name,
      about: data.about || '',
    });

    return { user: syncRes.data.user, idToken };
  },

  // Sign in existing user via Firebase Auth & fetch MongoDB profile
  async login(data: { email: string; password: string }): Promise<{ user: User; idToken: string }> {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    const firebaseUser = userCredential.user;

    const idToken = await firebaseUser.getIdToken();
    localStorage.setItem('token', idToken);

    // Fetch user profile from MongoDB
    const meRes = await api.get<User>('/auth/me');
    return { user: meRes.data, idToken };
  },

  // Logout current user session
  async logout(): Promise<void> {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Send Firebase Password Reset Email
  async forgotPassword(email: string): Promise<{ message: string }> {
    await sendPasswordResetEmail(auth, email);
    return { message: 'Password reset link has been sent to your email inbox.' };
  },

  // Confirm password reset using Firebase oobCode/token
  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    try {
      await confirmPasswordReset(auth, token, password);
      return { message: 'Password reset successfully! You can now log in with your new password.' };
    } catch (err: any) {
      const res = await api.post<{ message: string }>('/auth/reset-password', { token, password });
      return res.data;
    }
  },

  // Resend email verification link
  async resendVerificationEmail(): Promise<void> {
    if (!auth.currentUser) {
      throw new Error('No authenticated user found');
    }
    await sendEmailVerification(auth.currentUser);
  },

  // Update authenticated user's password
  async changePassword(newPassword: string): Promise<void> {
    if (!auth.currentUser) {
      throw new Error('No authenticated user found');
    }
    await firebaseUpdatePassword(auth.currentUser, newPassword);
  },

  // Get current user profile from backend
  async getMe(): Promise<User> {
    const res = await api.get<User>('/auth/me');
    return res.data;
  },

  // Sync profile data to backend
  async syncUser(name?: string, about?: string): Promise<User> {
    const res = await api.post<{ user: User }>('/auth/sync', { name, about });
    return res.data.user;
  },
};
