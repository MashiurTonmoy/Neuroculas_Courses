import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const ActivityTimelinePaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: '20px 24px',
  marginBottom: '14px',
  boxShadow: '0 2px 8px rgba(96,165,250,0.06)',
  borderLeft: `3px solid ${colors.primary}`,
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 6px 18px rgba(96,165,250,0.12)',
  },
}));
