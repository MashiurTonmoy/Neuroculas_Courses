import { createTheme } from '@mui/material/styles';

// ─── Neuroculas Courses Design Tokens — Light Blue Edition ───────────────────
export const colors = {
  // Backgrounds
  bgMain:  '#F8FBFF',   // near-white with the faintest blue tint
  bgCard:  '#FFFFFF',
  bgSoft:  '#EFF6FF',   // blue-50
  bgHero:  '#F0F9FF',   // sky-50

  // Blues
  primary:      '#60A5FA',  // blue-400  — light, friendly
  primaryDark:  '#3B82F6',  // blue-500
  primaryLight: '#93C5FD',  // blue-300
  soft:         '#EFF6FF',  // blue-50
  veryLight:    '#F0F9FF',  // sky-50

  // Text
  textMain:      '#1F2937',
  textSecondary: '#6B7280',
  textMuted:     '#9CA3AF',

  // Border
  border:       '#BFDBFE',  // blue-200
  borderStrong: '#93C5FD',  // blue-300

  // Semantic (unchanged)
  success: '#10B981',
  warning: '#F59E0B',
  error:   '#EF4444',
  info:    '#3B82F6',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:         colors.primary,
      light:        colors.primaryLight,
      dark:         colors.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:  '#6B7280',
      light: '#9CA3AF',
      dark:  '#374151',
    },
    background: {
      default: colors.bgMain,
      paper:   colors.bgCard,
    },
    text: {
      primary:   colors.textMain,
      secondary: colors.textSecondary,
    },
    divider:  colors.border,
    success:  { main: colors.success },
    warning:  { main: colors.warning },
    error:    { main: colors.error },
    info:     { main: colors.info },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 800, color: colors.textMain },
    h2: { fontWeight: 800, color: colors.textMain },
    h3: { fontWeight: 700, color: colors.textMain },
    h4: { fontWeight: 700, color: colors.textMain },
    h5: { fontWeight: 600, color: colors.textMain },
    h6: { fontWeight: 600, color: colors.textMain },
    body1:  { color: colors.textMain },
    body2:  { color: colors.textSecondary },
    caption: { color: colors.textMuted },
    button:  { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 4px rgba(96,165,250,0.06)',
    '0 2px 8px rgba(96,165,250,0.08)',
    '0 4px 12px rgba(96,165,250,0.10)',
    '0 6px 16px rgba(96,165,250,0.12)',
    '0 8px 20px rgba(96,165,250,0.14)',
    '0 10px 24px rgba(96,165,250,0.16)',
    '0 12px 28px rgba(96,165,250,0.18)',
    '0 14px 32px rgba(96,165,250,0.20)',
    '0 16px 36px rgba(96,165,250,0.22)',
    '0 18px 40px rgba(96,165,250,0.24)',
    '0 20px 44px rgba(96,165,250,0.26)',
    '0 22px 48px rgba(96,165,250,0.28)',
    '0 24px 52px rgba(96,165,250,0.30)',
    '0 26px 56px rgba(96,165,250,0.32)',
    '0 28px 60px rgba(96,165,250,0.34)',
    '0 30px 64px rgba(96,165,250,0.36)',
    '0 32px 68px rgba(96,165,250,0.38)',
    '0 34px 72px rgba(96,165,250,0.40)',
    '0 36px 76px rgba(96,165,250,0.42)',
    '0 38px 80px rgba(96,165,250,0.44)',
    '0 40px 84px rgba(96,165,250,0.46)',
    '0 42px 88px rgba(96,165,250,0.48)',
    '0 44px 92px rgba(96,165,250,0.50)',
    '0 46px 96px rgba(96,165,250,0.52)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.bgMain,
          color: colors.textMain,
        },
        '*::-webkit-scrollbar': { width: '6px' },
        '*::-webkit-scrollbar-track': { background: colors.bgMain },
        '*::-webkit-scrollbar-thumb': { background: colors.border, borderRadius: '3px' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '9px 22px',
          boxShadow: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          color: '#FFFFFF',
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primaryDark} 0%, #2563EB 100%)`,
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': { backgroundColor: colors.soft, borderColor: colors.primaryDark },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgCard,
          backgroundImage: 'none',
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(96,165,250,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgCard,
          backgroundImage: 'none',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 2px 8px rgba(96,165,250,0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(248,251,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: '0 1px 8px rgba(96,165,250,0.08)',
          color: colors.textMain,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: colors.textSecondary,
          '&.Mui-selected': { color: colors.primary, fontWeight: 700 },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: colors.primary, height: 3, borderRadius: 2 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600, fontSize: '0.8rem' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary },
          '& .MuiInputLabel-root': { color: colors.textSecondary },
          '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
          '& .MuiInputBase-input': { color: colors.textMain },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: colors.bgSoft,
            color: colors.textSecondary,
            fontWeight: 700,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: `1px solid ${colors.border}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: `1px solid ${colors.border}`, color: colors.textMain },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { '&:hover': { backgroundColor: colors.veryLight } },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled:  { color: '#F59E0B' },
        iconEmpty:   { color: colors.border },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': { color: colors.textSecondary, borderColor: colors.border },
          '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: colors.primary, color: '#FFFFFF' },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: { root: { color: colors.primary } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: colors.border } },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { backgroundColor: colors.soft, color: colors.primary, fontWeight: 700 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: colors.textMain,
          '&:hover': { backgroundColor: colors.veryLight },
          '&.Mui-selected': { backgroundColor: colors.soft, color: colors.primary },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${colors.border}`,
          boxShadow: '0 20px 60px rgba(96,165,250,0.15)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
  },
});
