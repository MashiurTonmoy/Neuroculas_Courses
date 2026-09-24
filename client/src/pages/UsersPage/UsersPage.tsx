import React from 'react';
import {
  Container,
  Typography,
  Box,
  InputBase,
  CircularProgress,
  Avatar,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import { useUsersPage } from './useUsersPage';
import { colors } from '../../theme/theme';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, searchQuery, setSearchQuery, loading } = useUsersPage();

  return (
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: colors.textSecondary, mb: 2, '&:hover': { bgcolor: colors.veryLight } }}
        >
          Back
        </Button>

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GroupRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain }}>
            Users Directory
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 4, ml: 7 }}>
          Search for community members and explore their published courses & materials.
        </Typography>

        {/* ── Search Bar ──────────────────────────────────────────────── */}
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            mb: 4,
            bgcolor: colors.bgCard,
            borderRadius: 3,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            boxShadow: '0 4px 16px rgba(96,165,250,0.06)',
          }}
        >
          <SearchRoundedIcon sx={{ color: colors.primary, ml: 1, fontSize: 22 }} />
          <InputBase
            placeholder="Search users by name..."
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ color: colors.textMain, fontSize: '0.95rem', fontWeight: 500 }}
          />
        </Paper>

        {/* ── Users List ──────────────────────────────────────────────── */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : users.length === 0 ? (
          <Box
            sx={{
              p: 7,
              bgcolor: colors.bgCard,
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
          >
            <GroupRoundedIcon sx={{ fontSize: 52, color: colors.border, mb: 2 }} />
            <Typography variant="h6" sx={{ color: colors.textMain, mb: 1 }}>
              No users found
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              Try searching with a different user name.
            </Typography>
          </Box>
        ) : (
          <Box>
            {users.map((u) => (
              <Paper
                key={u._id || u.id}
                onClick={() => navigate(`/profile/${u._id || u.id}`)}
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 1.75,
                  mb: 1.5,
                  bgcolor: colors.bgCard,
                  borderRadius: 3,
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: colors.primary,
                    bgcolor: colors.soft,
                    boxShadow: '0 4px 16px rgba(96,165,250,0.15)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {/* Single line Left: Logo / Avatar + Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                  <Avatar
                    src={u.avatar}
                    sx={{
                      width: 44,
                      height: 44,
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(96,165,250,0.25)',
                    }}
                  >
                    {u.name ? u.name[0].toUpperCase() : 'U'}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: colors.textMain,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {u.name}
                    </Typography>
                    {u.role === 'admin' && (
                      <Chip
                        label="Admin"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          bgcolor: colors.soft,
                          color: colors.primaryDark,
                          fontWeight: 700,
                          mt: 0.25,
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Single line Right: Upload Count */}
                <Chip
                  label={`${u.uploadCount} file${u.uploadCount !== 1 ? 's' : ''} uploaded`}
                  sx={{
                    bgcolor: u.uploadCount > 0 ? '#DCFCE7' : colors.veryLight,
                    color: u.uploadCount > 0 ? '#15803D' : colors.textSecondary,
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    px: 1,
                    height: 32,
                  }}
                />
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};
