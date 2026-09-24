import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

// Pages
import { HomeFeedPage } from './pages/HomeFeedPage/HomeFeedPage';
import { ExplorePage } from './pages/ExplorePage/ExplorePage';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { CourseDetailPage } from './pages/CourseDetailPage/CourseDetailPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
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
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FBFF' }}>
            <Navbar />
            <Box
              sx={{
                flexGrow: 1,
                backgroundImage: 'url(/assets/bg-pattern.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: { xs: '100% auto', md: '720px auto' },
                position: 'relative',
              }}
            >
              <Routes>
                {/* 1. Home Feed */}
                <Route path="/" element={<HomeFeedPage />} />
                {/* 2. Explore Marketplace */}
                <Route path="/explore" element={<ExplorePage />} />
                {/* Users Directory */}
                <Route path="/users" element={<UsersPage />} />
                {/* 3. Course Detail & Reviews */}
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                {/* 4. Login */}
                <Route path="/login" element={<LoginPage />} />
                {/* 5. Register */}
                <Route path="/register" element={<RegisterPage />} />
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
