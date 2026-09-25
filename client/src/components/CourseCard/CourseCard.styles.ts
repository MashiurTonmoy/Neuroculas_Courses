import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCourseCard = styled(Card)(() => ({
  backgroundColor: '#FFFFFF',
  border: '2px solid #38BDF8',
  borderRadius: 28,
  transition: 'transform 0.24s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.24s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 30px rgba(56, 189, 248, 0.16)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 14px 38px rgba(56, 189, 248, 0.28)',
    borderColor: '#0284C7',
  },
}));

export const CardHeaderBanner = styled(Box)(() => ({
  height: 124,
  background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 55%, #7DD3FC 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexShrink: 0,
  overflow: 'hidden',
}));

export const EmblemContainer = styled(Box)(() => ({
  width: 68,
  height: 68,
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  border: '3.5px solid #38BDF8',
  boxShadow: '0 6px 20px rgba(56, 189, 248, 0.32)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  position: 'relative',
}));

export const FooterRibbon = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #38BDF8 100%)',
  border: '1.5px solid #BAE6FD',
  borderRadius: 20,
  padding: '8px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: 'auto',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.18)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(56, 189, 248, 0.28)',
  },
}));
