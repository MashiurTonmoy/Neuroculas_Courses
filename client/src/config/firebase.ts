import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC1tY36peNVkDn7oEEOoMDMgM_c4IORoSs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "neuroculas-courses.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "neuroculas-courses",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "neuroculas-courses.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "109480449001950773077",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:109480449001950773077:web:d66852abfdf4438314ae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Ensure local persistence for seamless auth state across browser reloads
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error('Failed to set Firebase Auth persistence:', err);
});
