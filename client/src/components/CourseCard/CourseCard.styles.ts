import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCourseCard = styled(Card)(() => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 24,
  transition: 'transform 0.24s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.24s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.24s ease',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(148, 163, 184, 0.10)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    borderColor: '#93C5FD',
    boxShadow: '0 12px 32px rgba(96, 165, 250, 0.20)',
  },
}));

export const CardHeaderBanner = styled(Box)(() => ({
  height: 120,
  background: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 65%, #F8FAFC 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexShrink: 0,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-1px',
    left: 0,
    right: 0,
    height: '24px',
    background: 'radial-gradient(100% 100% at 50% 100%, transparent 45%, #FFFFFF 50%)',
    opacity: 0.5,
  },
}));

export const EmblemContainer = styled(Box)(() => ({
  width: 68,
  height: 68,
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
  border: '3px solid #FFFFFF',
  boxShadow: '0 6px 18px rgba(56, 189, 248, 0.28)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
}));

export const FooterRibbon = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1E3A8A 100%)',
  borderRadius: 16,
  padding: '8px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: 'auto',
  transition: 'transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease',
  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
  '&:hover': {
    opacity: 0.94,
    transform: 'scale(1.01)',
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.35)',
  },
}));
