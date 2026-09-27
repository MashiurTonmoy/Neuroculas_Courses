import React from 'react';
import {
  Container,
  Typography,
  Box,
  InputBase,
  CircularProgress,
  Paper,
  Button,
  Pagination,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import { UserCard } from '../../components/UserCard/UserCard';
import { useUsersPage } from './useUsersPage';
import { colors } from '../../theme/theme';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, searchQuery, setSearchQuery, loading, page, setPage, totalPages } = useUsersPage();

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
          Search for community members and explore their published courses &amp; materials.
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
              <UserCard
                key={u._id || u.id}
                user={u}
                onClick={() => navigate(`/profile/${u._id || u.id}`)}
              />
            ))}

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, val) => setPage(val)}
                  size="small"
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': { color: colors.textSecondary, borderColor: colors.border },
                    '& .Mui-selected': { bgcolor: `${colors.primary} !important`, color: '#FFF', fontWeight: 800 },
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};
