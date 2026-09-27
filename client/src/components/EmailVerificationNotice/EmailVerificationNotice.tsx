import React, { useState } from 'react';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const EmailVerificationNotice: React.FC = () => {
  const { isAuthenticated, isEmailVerified, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isAuthenticated || isEmailVerified) {
    return null;
  }

  const handleResend = async () => {
    setLoading(true);
    try {
      await resendVerificationEmail();
      setSent(true);
    } catch (err) {
      console.error('Failed to resend verification email:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, pt: 2 }}>
      <Alert
        severity="warning"
        icon={<MarkEmailReadRoundedIcon />}
        action={
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              color="inherit"
              size="small"
              onClick={handleResend}
              disabled={loading || sent}
              sx={{ fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={16} /> : sent ? 'Sent!' : 'Resend Link'}
            </Button>
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              onClick={() => navigate('/verify-email')}
              sx={{ fontWeight: 700 }}
            >
              Verify Page
            </Button>
          </Box>
        }
        sx={{ borderRadius: 3 }}
      >
        Your email address is unverified. Please check your inbox or resend the link to access all features.
      </Alert>
    </Box>
  );
};
