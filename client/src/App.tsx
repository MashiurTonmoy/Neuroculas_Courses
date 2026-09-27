import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import { EmailVerificationNotice } from './components/EmailVerificationNotice/EmailVerificationNotice';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { VantaBackground } from './components/VantaBackground/VantaBackground';

// Pages
import { HomeFeedPage } from './pages/HomeFeedPage/HomeFeedPage';
import { ExplorePage } from './pages/ExplorePage/ExplorePage';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { CourseDetailPage } from './pages/CourseDetailPage/CourseDetailPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPasswordPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage/VerifyEmailPage';
import { ProfileOverviewPage } from './pages/ProfileOverviewPage/ProfileOverviewPage';
import { ProfileActivityPage } from './pages/ProfileActivityPage/ProfileActivityPage';
import { MyLibraryPage } from './pages/MyLibraryPage/MyLibraryPage';
import { CreatePostPage } from './pages/CreatePostPage/CreatePostPage';
import { PaymentCheckoutPage } from './pages/PaymentCheckoutPage/PaymentCheckoutPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage/AdminDashboardPage';
import { ModerationQueuePage } from './pages/ModerationQueuePage/ModerationQueuePage';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'transparent', position: 'relative' }}>
            <VantaBackground />
            <Sidebar />
            <Box
              sx={{
                flexGrow: 1,
                position: 'relative',
                zIndex: 1,
                pl: { xs: 0, md: '74px' },
                pb: { xs: '66px', md: 0 },
              }}
            >
              <EmailVerificationNotice />
              <Routes>
                {/* 1. Home Feed */}
                <Route path="/" element={<HomeFeedPage />} />
                {/* 2. Explore Marketplace */}
                <Route path="/explore" element={<ExplorePage />} />
                {/* Users Directory */}
                <Route path="/users" element={<UsersPage />} />
                {/* 3. Course Detail & Reviews */}
                <Route path="/courses/:id" element={<CourseDetailPage />} />

                {/* 4. Login (Guest Only) */}
                <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
                {/* 5. Register (Guest Only) */}
                <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
                {/* Forgot Password */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                {/* Reset Password */}
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                {/* Email Verification Page */}
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                {/* 6. Profile Overview */}
                <Route path="/profile/:id" element={<ProfileOverviewPage />} />
                {/* 7. Profile Activity Feed */}
                <Route path="/profile/:id/activity" element={<ProfileActivityPage />} />

                {/* 8. My Library (Protected) */}
                <Route path="/library" element={<ProtectedRoute><MyLibraryPage /></ProtectedRoute>} />
                {/* 9. Create Post / Upload (Protected) */}
                <Route path="/upload" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
                {/* 10. Payment Checkout (Protected) */}
                <Route path="/checkout/:id" element={<ProtectedRoute><PaymentCheckoutPage /></ProtectedRoute>} />
                {/* Dashboard (Protected) */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

                {/* 11. Admin Dashboard (Admin Only) */}
                <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboardPage /></ProtectedRoute>} />
                {/* 12. Moderation Queue (Admin Only) */}
                <Route path="/admin/moderation" element={<ProtectedRoute requireAdmin><ModerationQueuePage /></ProtectedRoute>} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};
