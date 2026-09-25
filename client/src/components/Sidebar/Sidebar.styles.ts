import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '../../theme/theme';

export const DesktopSidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '74px',
  backgroundColor: 'rgba(219, 234, 254, 0.92)',
  backdropFilter: 'blur(16px)',
  borderRight: `1.5px solid ${colors.borderStrong}`,
  borderRadius: '0px 26px 26px 0px',
  boxShadow: '4px 0 24px rgba(59, 130, 246, 0.18)',
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '20px',
  paddingBottom: '20px',
  paddingLeft: '6px',
  paddingRight: '6px',
  zIndex: 1100,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const MobileBottomNavContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '66px',
  width: '100vw',
  backgroundColor: 'rgba(219, 234, 254, 0.95)',
  backdropFilter: 'blur(16px)',
  borderTop: `1.5px solid ${colors.borderStrong}`,
  borderRadius: '26px 26px 0px 0px',
  boxShadow: '0 -4px 24px rgba(59, 130, 246, 0.18)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingLeft: '8px',
  paddingRight: '8px',
  zIndex: 1100,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const NavItemBox = styled(Box)<{ active?: number }>(({ active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '56px',
  borderRadius: '14px',
  cursor: 'pointer',
  padding: '4px 2px',
  transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: active ? 'rgba(59, 130, 246, 0.26)' : 'transparent',
  color: active ? '#1E40AF' : '#1E3A8A',
  border: active ? `1px solid ${colors.primaryDark}` : '1px solid transparent',
  boxShadow: active ? '0 4px 12px rgba(59, 130, 246, 0.22)' : 'none',
  '&:hover': {
    backgroundColor: active ? 'rgba(59, 130, 246, 0.32)' : 'rgba(59, 130, 246, 0.16)',
    color: '#1D4ED8',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'scale(0.96)',
  },
}));

export const SidebarLogoBadge = styled(Box)(() => ({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  width: 42,
  height: 42,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(96, 165, 250, 0.32)',
  transition: 'transform 0.2s ease, boxShadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.06)',
    boxShadow: '0 6px 18px rgba(96, 165, 250, 0.45)',
  },
}));
