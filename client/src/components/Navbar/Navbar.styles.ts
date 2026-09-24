import { styled } from '@mui/material/styles';
import { AppBar, Button, Box } from '@mui/material';
import { colors } from '../../theme/theme';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 253, 253, 0.92)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${colors.border}`,
  boxShadow: '0 1px 8px rgba(96,165,250,0.08)',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

export const LogoBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  textDecoration: 'none',
}));

export const LogoBadge = styled(Box)(() => ({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  width: 36,
  height: 36,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFFFFF',
  fontWeight: 800,
  boxShadow: '0 4px 12px rgba(96,165,250,0.30)',
}));

export const NavButton = styled(Button)<{ active?: number }>(({ active }) => ({
  color: active ? colors.primary : colors.textSecondary,
  fontWeight: active ? 700 : 500,
  textTransform: 'none',
  fontSize: '0.9rem',
  padding: '6px 14px',
  borderRadius: 8,
  '&:hover': {
    color: colors.primary,
    backgroundColor: colors.veryLight,
  },
}));

export const PrimaryCTA = styled(Button)(() => ({
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  color: '#FFFFFF',
  fontWeight: 700,
  padding: '8px 20px',
  borderRadius: 10,
  boxShadow: '0 4px 14px rgba(96,165,250,0.30)',
  '&:hover': {
    background: `linear-gradient(135deg, ${colors.primaryDark} 0%, #DB2777 100%)`,
    boxShadow: '0 6px 18px rgba(96,165,250,0.40)',
  },
}));
