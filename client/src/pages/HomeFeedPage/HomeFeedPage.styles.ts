import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const HeroContainer = styled(Box)(() => ({
  background: 'transparent',
  padding: '70px 0 60px',
  textAlign: 'center',
  position: 'relative',
  borderBottom: 'none',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colors.soft} 0%, transparent 68%)`,
    opacity: 0.8,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colors.veryLight} 0%, transparent 68%)`,
    opacity: 0.9,
  },
}));

export const MissionBanner = styled(Box)(() => ({
  background: `linear-gradient(135deg, ${colors.primaryDark} 0%, #1D4ED8 100%)`,
  color: '#FFFFFF',
  borderRadius: 20,
  padding: '40px 36px',
  marginBottom: '16px',
  boxShadow: '0 12px 40px rgba(96,165,250,0.28)',
}));

export const MissionCard = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 18,
  padding: '28px 24px',
  height: '100%',
  boxShadow: '0 2px 12px rgba(96,165,250,0.07)',
  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(96,165,250,0.14)',
  },
}));

export const FeatureCard = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 20,
  padding: '32px 28px',
  boxShadow: '0 2px 12px rgba(96,165,250,0.07)',
  height: '100%',
  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 28px rgba(96,165,250,0.14)',
  },
}));
