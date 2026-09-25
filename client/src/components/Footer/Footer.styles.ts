import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '../../theme/theme';

export const FooterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  backgroundColor: 'rgba(239, 246, 255, 0.85)',
  backdropFilter: 'blur(12px)',
  borderTop: `1px solid ${colors.border}`,
  color: colors.textSecondary,
  paddingTop: '24px',
  paddingBottom: '24px',
  marginBottom: '66px',
  [theme.breakpoints.up('md')]: {
    minHeight: '64px',
    height: '64px',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: '74px',
    display: 'flex',
    alignItems: 'center',
  },
}));
