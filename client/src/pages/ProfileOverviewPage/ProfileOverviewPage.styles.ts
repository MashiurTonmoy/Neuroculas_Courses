import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const ProfileHeaderPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 20,
  padding: '32px',
  marginBottom: '32px',
  background: `linear-gradient(160deg, ${colors.bgCard} 60%, ${colors.veryLight} 100%)`,
  boxShadow: '0 4px 20px rgba(96,165,250,0.09)',
}));
