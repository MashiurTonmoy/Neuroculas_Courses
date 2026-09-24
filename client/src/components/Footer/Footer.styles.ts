import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors } from '../../theme/theme';

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: colors.bgSoft,
  borderTop: `1px solid ${colors.border}`,
  color: colors.textSecondary,
  paddingTop: '24px',
  paddingBottom: '24px',
  [theme.breakpoints.up('md')]: {
    minHeight: '64px',
    height: '64px',
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
}));
