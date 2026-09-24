import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import { colors } from '../../theme/theme';

export const FilterBarPaper = styled(Paper)(() => ({
  backgroundColor: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: '16px 20px',
  marginBottom: '28px',
  boxShadow: '0 2px 10px rgba(96,165,250,0.07)',
}));

export const SearchInputBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.veryLight,
  borderRadius: 10,
  padding: '6px 14px',
  border: `1px solid ${colors.border}`,
  transition: 'border-color 0.2s ease',
  '&:focus-within': {
    borderColor: colors.primary,
    backgroundColor: colors.bgCard,
  },
}));
