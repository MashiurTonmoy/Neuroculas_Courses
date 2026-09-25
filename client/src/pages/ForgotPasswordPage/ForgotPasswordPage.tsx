import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress, Link } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { colors } from '../../theme/theme';
import { AuthCardPaper } from '../LoginPage/LoginPage.styles';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await authService.forgotPassword(email);
      setSuccessMsg(res.message || 'Password reset link has been sent! Please check your email inbox or spam folder.');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to send password reset email. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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
          onClick={() => navigate('/login')}
          sx={{ color: colors.textSecondary, mb: 2, p: 0, '&:hover': { bgcolor: 'transparent', color: colors.primary } }}
        >
          Back to Sign In
        </Button>

        {/* Header Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              width: 54,
              height: 54,
              borderRadius: 3.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(96,165,250,0.30)',
            }}
          >
            <LockResetRoundedIcon sx={{ color: '#FFF', fontSize: 30 }} />
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', color: colors.textMain, mb: 0.75 }}>
          Forgot Password?
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textSecondary, textAlign: 'center', mb: 4, px: 1 }}>
          Enter your account email address below and we'll send you a link to reset your password.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {successMsg ? (
          <Box sx={{ textAlign: 'center', py: 1 }}>
            <Alert
              icon={<MarkEmailReadRoundedIcon fontSize="inherit" />}
              severity="success"
              sx={{ mb: 3, borderRadius: 2, textAlign: 'left', lineHeight: 1.6 }}
            >
              <strong>Check your email!</strong>
              <br />
              {successMsg}
            </Alert>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                py: 1.25,
                fontWeight: 700,
                borderRadius: 2.5,
              }}
            >
              Return to Login
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
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
              {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Send Reset Link'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', color: colors.textSecondary }}>
              Remember your password?{' '}
              <Link
                onClick={() => navigate('/login')}
                sx={{ color: colors.primary, cursor: 'pointer', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Sign In
              </Link>
            </Typography>
          </form>
        )}
      </AuthCardPaper>
    </Box>
  );
};
