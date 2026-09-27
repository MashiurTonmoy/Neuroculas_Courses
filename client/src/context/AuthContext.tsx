import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from '../types/user';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, about?: string) => Promise<void>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  reloadUser: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Subscribe to Firebase Auth state changes across page reloads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentFirebaseUser) => {
      setFirebaseUser(currentFirebaseUser);

      if (currentFirebaseUser) {
        try {
          const idToken = await currentFirebaseUser.getIdToken();
          setToken(idToken);
          localStorage.setItem('token', idToken);

          // Fetch fresh MongoDB profile
          const mongoUser = await authService.getMe();
          setUser(mongoUser);
          localStorage.setItem('user', JSON.stringify(mongoUser));
        } catch (err) {
          console.error('Error restoring user session from MongoDB:', err);
        }
      } else {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      setToken(data.idToken);
      setUser(data.user);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, about?: string) => {
    setLoading(true);
    try {
      const data = await authService.register({ name, email, password, about });
      setToken(data.idToken);
      setUser(data.user);
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setToken(null);
      setUser(null);
      setFirebaseUser(null);
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    await authService.resendVerificationEmail();
  };

  const reloadUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setFirebaseUser(auth.currentUser);
      try {
        const mongoUser = await authService.getMe();
        setUser(mongoUser);
        localStorage.setItem('user', JSON.stringify(mongoUser));
      } catch (err) {
        console.error('Error reloading user profile:', err);
      }
    }
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const newUser = { ...prev, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const isAuthenticated = !!firebaseUser || (!!token && !!user);
  const isEmailVerified = firebaseUser ? firebaseUser.emailVerified : !!user?.emailVerified;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        token,
        loading,
        isAuthenticated,
        isEmailVerified,
        isAdmin,
        login,
        register,
        logout,
        resendVerificationEmail,
        reloadUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
