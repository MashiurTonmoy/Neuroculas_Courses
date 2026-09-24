import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const StatCardPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 20,
  padding: '28px 24px',
  textAlign: 'center',
  boxShadow: '0 2px 12px rgba(96,165,250,0.07)',
  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(96,165,250,0.14)',
  },
}));
