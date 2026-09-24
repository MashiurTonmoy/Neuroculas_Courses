import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const CheckoutPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 20,
  padding: '36px',
  boxShadow: '0 4px 20px rgba(96,165,250,0.10)',
}));
