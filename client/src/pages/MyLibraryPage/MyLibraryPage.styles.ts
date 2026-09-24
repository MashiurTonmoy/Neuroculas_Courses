import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { colors } from '../../theme/theme';

export const LibraryCardPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxShadow: '0 2px 10px rgba(96,165,250,0.07)',
  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(96,165,250,0.14)',
  },
}));
