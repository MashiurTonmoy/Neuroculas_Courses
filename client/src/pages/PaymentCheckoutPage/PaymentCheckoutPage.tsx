import React from 'react';
import { Container, Typography, Box, Button, Alert, CircularProgress } from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { usePaymentCheckoutPage } from './usePaymentCheckoutPage';
import { CheckoutPaper } from './PaymentCheckoutPage.styles';
import { FileTypeIcon } from '../../components/FileTypeIcon/FileTypeIcon';
import { colors } from '../../theme/theme';

export const PaymentCheckoutPage: React.FC = () => {
  const { course, loading, processing, success, handleCheckoutSubmit, navigate } = usePaymentCheckoutPage();

  if (loading) {
    return (
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: colors.textMain }}>Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: colors.textSecondary, mb: 3, '&:hover': { bgcolor: colors.veryLight } }}
        >
          Back
        </Button>

        <CheckoutPaper elevation={0}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CreditCardRoundedIcon sx={{ color: '#FFF', fontSize: 20 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: colors.textMain }}>
              Checkout &amp; Payment
            </Typography>
          </Box>

          {success ? (
            <Alert
              icon={<CheckCircleRoundedIcon fontSize="inherit" />}
              severity="success"
              sx={{ mb: 3 }}
            >
              Payment completed! Redirecting to your library...
            </Alert>
          ) : (
            <form onSubmit={handleCheckoutSubmit}>
              {/* Order Summary */}
              <Box
                sx={{
                  p: 3,
                  bgcolor: colors.veryLight,
                  borderRadius: 3,
                  border: `1px solid ${colors.border}`,
                  mb: 4,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: colors.textSecondary, fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.72rem' }}
                >
                  Order Summary
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5, mb: 2 }}>
                  <FileTypeIcon fileUrl={course.fileUrl} variant="badge" size={44} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colors.textMain, lineHeight: 1.3 }}>
                    {course.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: 1.5,
                    borderTop: `1px solid ${colors.border}`,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>Total Amount:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: colors.primary }}>
                    {course.price === 0 ? '0 ৳ — Free Enrollment' : `${course.price} ৳`}
                  </Typography>
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={processing}
                startIcon={<LockRoundedIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  color: '#FFF',
                  py: 1.5,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 14px rgba(96,165,250,0.30)',
                  '&:hover': { boxShadow: '0 6px 20px rgba(96,165,250,0.40)' },
                }}
              >
                {processing ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Confirm & Access File'}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 2 }}>
                <LockRoundedIcon sx={{ fontSize: 14, color: colors.textMuted }} />
                <Typography variant="caption" sx={{ color: colors.textMuted }}>
                  Secured by Stripe — your payment info is never stored
                </Typography>
              </Box>
            </form>
          )}
        </CheckoutPaper>
      </Container>
    </Box>
  );
};
