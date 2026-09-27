import { styled } from '@mui/material/styles';
import { Box, DialogContent } from '@mui/material';
import { colors } from '../../theme/theme';

export const StyledDialogContent = styled(DialogContent)(() => ({
  backgroundColor: colors.bgCard,
  color: colors.textMain,
  padding: '24px 32px',
  maxHeight: 'calc(85vh - 120px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#BFDBFE',
    borderRadius: '4px',
    '&:hover': {
      background: colors.primary,
    },
  },
}));

export const DropZoneBox = styled(Box)(() => ({
  border: `2px dashed ${colors.border}`,
  borderRadius: 12,
  padding: '32px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: colors.veryLight,
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
  '&:hover': {
    borderColor: colors.primary,
    backgroundColor: colors.soft,
  },
}));
