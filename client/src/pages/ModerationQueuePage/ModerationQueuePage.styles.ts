import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const TableContainerPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  boxShadow: '0 2px 10px rgba(96,165,250,0.07)',
  overflow: 'hidden',
}));
