import React, { useState } from 'react';
import {
  Box,
  Typography,
  OutlinedInput,
  Select,
  IconButton,
  InputAdornment,
  FormHelperText,
  OutlinedInputProps,
  SelectProps,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { colors } from '../../theme/theme';

export interface FormFieldProps extends Omit<OutlinedInputProps, 'label'> {
  label?: string;
  type?: string;
  helperText?: React.ReactNode;
  select?: boolean;
  children?: React.ReactNode;
  required?: boolean;
  FormHelperTextProps?: any;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  fullWidth = true,
  disabled,
  error,
  helperText,
  select = false,
  children,
  multiline,
  rows,
  endAdornment,
  startAdornment,
  sx,
  FormHelperTextProps,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  const passwordEndAdornment = isPasswordField ? (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPassword((prev) => !prev)}
        onMouseDown={(e) => e.preventDefault()}
        edge="end"
        size="small"
        sx={{ color: colors.textSecondary }}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <VisibilityOffRoundedIcon fontSize="small" /> : <VisibilityRoundedIcon fontSize="small" />}
      </IconButton>
    </InputAdornment>
  ) : (
    endAdornment
  );

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto', mb: 2.5 }}>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: '0.925rem',
            color: '#374151',
            mb: 0.75,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {label}
          {required && <Box component="span" sx={{ color: colors.error }}>*</Box>}
        </Typography>
      )}

      {select ? (
        <Select
          fullWidth={fullWidth}
          value={value}
          onChange={onChange as SelectProps['onChange']}
          disabled={disabled}
          error={error}
          displayEmpty
          sx={{
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary, borderWidth: '1.5px' },
            '& .MuiSelect-select': {
              padding: '12px 14px',
              fontSize: '0.95rem',
              color: colors.textMain,
            },
            ...sx,
          }}
          {...(rest as any)}
        >
          {children}
        </Select>
      ) : (
        <OutlinedInput
          fullWidth={fullWidth}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          error={error}
          multiline={multiline}
          rows={rows}
          startAdornment={startAdornment}
          endAdornment={passwordEndAdornment}
          sx={{
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary, borderWidth: '1.5px' },
            '& .MuiInputBase-input': {
              padding: multiline ? undefined : '12px 14px',
              fontSize: '0.95rem',
              color: colors.textMain,
              '&::placeholder': {
                color: '#9CA3AF',
                opacity: 1,
              },
            },
            ...sx,
          }}
          {...rest}
        />
      )}

      {helperText && (
        <FormHelperText error={error} sx={{ ml: 0.5, mt: 0.5, fontWeight: 500, ...FormHelperTextProps?.sx }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};
