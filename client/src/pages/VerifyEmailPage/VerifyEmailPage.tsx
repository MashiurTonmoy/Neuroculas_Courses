import React, { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Paper } from '@mui/material';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/theme';
import { useNavigate } from 'react-router-dom';

export const VerifyEmailPage: React.FC = () => {
  const { user, firebaseUser, isEmailVerified, resendVerificationEmail, reloadUser, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await reloadUser();
      if (firebaseUser?.emailVerified) {
        setMessage('Your email has been verified! Redirecting to home feed...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage('Email not verified yet. Please check your inbox or click resend below.');
      }
    } catch (err: any) {
      setError('Failed to check verification status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    setMessage(null);
    try {
      await resendVerificationEmail();
      setMessage('A new verification email link has been sent to your inbox!');
    } catch (err: any) {
      setError(err.message || 'Too many requests. Please wait a moment before trying again.');
    } finally {
      setResending(false);
    }
  };

  const userEmail = firebaseUser?.email || user?.email || '';

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 4,
          borderRadius: 4,
          background: '#FFFFFF',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            boxShadow: '0 8px 20px rgba(96,165,250,0.30)',
          }}
        >
          <MarkEmailUnreadRoundedIcon sx={{ color: '#FFF', fontSize: 36 }} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain, mb: 1 }}>
          Verify Your Email
        </Typography>

        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
          We sent a verification link to <strong>{userEmail}</strong>. Please click the link in your email to verify your account.
        </Typography>

        {isEmailVerified && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            Your email is verified! You now have full access to all features.
          </Alert>
        )}

        {message && !isEmailVerified && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleRefresh}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshRoundedIcon />}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 2.5,
            }}
          >
            I've Verified My Email
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleResend}
            disabled={resending}
            startIcon={resending ? <CircularProgress size={20} color="inherit" /> : <SendRoundedIcon />}
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              py: 1.25,
              fontWeight: 700,
              borderRadius: 2.5,
            }}
          >
            Resend Verification Link
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={logout}
            sx={{ mt: 1, fontWeight: 600, color: colors.textSecondary }}
          >
            Sign Out
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
