import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const DetailPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 20,
  padding: '32px',
  marginBottom: '28px',
  boxShadow: '0 2px 12px rgba(96,165,250,0.07)',
}));

export const ReviewPaper = styled(Paper)(() => ({
  backgroundColor: colors.veryLight,
  border: `1px solid ${colors.border}`,
  borderRadius: 14,
  padding: '16px 20px',
  marginBottom: '12px',
  boxShadow: 'none',
}));
