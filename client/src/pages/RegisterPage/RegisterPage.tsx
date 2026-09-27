import React from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Link } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { FormField } from '../../components/FormField/FormField';
import { useRegisterPage } from './useRegisterPage';
import { AuthCardPaper } from './RegisterPage.styles';
import { colors } from '../../theme/theme';

export const RegisterPage: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    about,
    setAbout,
    loading,
    error,
    handleSubmit,
    navigate,
  } = useRegisterPage();

  return (
    <Box
      sx={{
        bgcolor: 'transparent',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
        background: `linear-gradient(160deg, rgba(248, 251, 255, 0.88) 0%, rgba(240, 249, 255, 0.82) 60%, rgba(239, 246, 255, 0.82) 100%)`,
      }}
    >
      <AuthCardPaper elevation={0}>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: colors.textSecondary, mb: 2, p: 0, '&:hover': { bgcolor: 'transparent', color: colors.primary } }}
        >
          Back
        </Button>

        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              width: 52,
              height: 52,
              borderRadius: 3.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(96,165,250,0.30)',
            }}
          >
            <AutoStoriesRoundedIcon sx={{ color: '#FFF', fontSize: 26 }} />
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', color: colors.textMain, mb: 0.75 }}>
          Create Account
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textSecondary, textAlign: 'center', mb: 4 }}>
          Join Neuroculas Courses to share, sell, and download courses
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <FormField
            label="User Name"
            placeholder="Enter your username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormField
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormField
            label="About / Bio (Optional)"
            placeholder="Tell the community a little about yourself..."
            multiline
            rows={2}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              color: '#FFF',
              py: 1.5,
              fontWeight: 800,
              fontSize: '0.95rem',
              mb: 3,
              boxShadow: '0 4px 14px rgba(96,165,250,0.30)',
              '&:hover': { boxShadow: '0 6px 20px rgba(96,165,250,0.40)' },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Get Started Free'}
          </Button>

          <Typography variant="body2" sx={{ textAlign: 'center', color: colors.textSecondary }}>
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/login')}
              sx={{ color: colors.primary, cursor: 'pointer', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </AuthCardPaper>
    </Box>
  );
};
