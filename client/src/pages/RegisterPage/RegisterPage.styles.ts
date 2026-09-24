import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const AuthCardPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 24,
  padding: '40px 36px',
  width: '100%',
  maxWidth: 420,
  boxShadow: '0 8px 40px rgba(96,165,250,0.12)',
}));
