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
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 2,
                  mb: 2,
                  background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #38BDF8 100%)',
                  borderRadius: 5,
                  border: '1.5px solid #BAE6FD',
                  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.18)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(56, 189, 248, 0.28)',
                    borderColor: '#38BDF8',
                  },
                }}
              >
                {/* Decorative Background Waves */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 800 80"
                  preserveAspectRatio="none"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                >
                  <path d="M 400,80 C 550,20 650,60 800,0 L 800,80 Z" fill="rgba(56, 189, 248, 0.35)" />
                  <path d="M 500,80 C 620,30 720,65 800,20 L 800,80 Z" fill="rgba(186, 230, 253, 0.55)" />
                  <path d="M 600,80 Q 700,45 800,60 L 800,80 Z" fill="#34D399" opacity="0.5" />
                </svg>

                {/* Left: Avatar + Name + Admin Badge */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0, zIndex: 2 }}>
                  <Avatar
                    src={u.avatar}
                    sx={{
                      width: 46,
                      height: 46,
                      bgcolor: '#0B2545',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      border: '2.5px solid #38BDF8',
                      boxShadow: '0 3px 10px rgba(11, 37, 69, 0.25)',
                    }}
                  >
                    {u.name ? u.name[0].toUpperCase() : 'U'}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: '#0F172A',
                          fontSize: '1.05rem',
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
                            height: 20,
                            fontSize: '0.68rem',
                            bgcolor: '#FFFFFF',
                            color: '#0284C7',
                            border: '1px solid #38BDF8',
                            fontWeight: 800,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Right: Upload Count Chip Styled like White Action Pill */}
                <Chip
                  label={`${u.uploadCount} file${u.uploadCount !== 1 ? 's' : ''} uploaded`}
                  sx={{
                    bgcolor: '#FFFFFF',
                    color: '#0F172A',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    px: 1.5,
                    height: 36,
                    borderRadius: 99,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.10)',
                    border: '1px solid #BAE6FD',
                    zIndex: 2,
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
