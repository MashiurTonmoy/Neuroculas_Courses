import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Button, Chip, CircularProgress } from '@mui/material';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import { useProfileOverviewPage } from './useProfileOverviewPage';
import { ProfileHeaderPaper } from './ProfileOverviewPage.styles';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { colors } from '../../theme/theme';

export const ProfileOverviewPage: React.FC = () => {
  const { currentUser, user, uploads, loading, handleDeleteCourse } = useProfileOverviewPage();
  const navigate = useNavigate();

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

        {/* ── Profile Header ───────────────────────────────────────────── */}
        <ProfileHeaderPaper elevation={0}>
          <Grid container spacing={3} alignItems="center">
            {/* Avatar */}
            <Grid item xs={12} sm="auto">
              <Avatar
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  width: 88,
                  height: 88,
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#FFF',
                  boxShadow: '0 6px 20px rgba(96,165,250,0.30)',
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
            </Grid>

            {/* Info */}
            <Grid item xs={12} sm>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75, flexWrap: 'wrap' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain }}>
                  {user?.name || 'Neuroculas User'}
                </Typography>
                <Chip
                  icon={
                    user?.role === 'admin'
                      ? <AdminPanelSettingsRoundedIcon sx={{ fontSize: 14, color: `${colors.primaryDark} !important` }} />
                      : <VerifiedRoundedIcon sx={{ fontSize: 14, color: `${colors.primaryDark} !important` }} />
                  }
                  label={user?.role === 'admin' ? 'Admin Creator' : 'Verified Creator'}
                  sx={{
                    bgcolor: colors.soft,
                    color: colors.primaryDark,
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    border: `1px solid ${colors.border}`,
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 2.5 }}>
                {user?.email} · Member of Neuroculas Courses Community
              </Typography>

              <Button
                variant="contained"
                startIcon={<TimelineRoundedIcon />}
                onClick={() => navigate(`/profile/${user?.id || user?._id}/activity`)}
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  color: '#FFF',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(96,165,250,0.25)',
                  '&:hover': { boxShadow: '0 6px 16px rgba(96,165,250,0.35)' },
                }}
              >
                View Activity Feed
              </Button>
            </Grid>

            {/* Stats */}
            <Grid item xs={12} md="auto">
              <Box
                sx={{
                  p: 2.5,
                  bgcolor: colors.soft,
                  borderRadius: 3,
                  border: `1px solid ${colors.border}`,
                  textAlign: 'center',
                  minWidth: 120,
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, color: colors.primary, fontSize: '2.2rem' }}>
                  {loading ? '—' : uploads.length}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.textSecondary, fontWeight: 600 }}>
                  Files Published
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ProfileHeaderPaper>

        {/* ── Published Content ────────────────────────────────────────── */}
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: colors.textMain }}>
          Published Content
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : uploads.length === 0 ? (
          <Box
            sx={{
              p: 5,
              bgcolor: colors.bgCard,
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ color: colors.textSecondary }}>
              No published courses yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {uploads.map((course) => {
              const currentUserId = currentUser?._id || currentUser?.id;
              const ownerId = typeof course.owner === 'object' && course.owner !== null ? (course.owner._id || course.owner.id) : course.owner;
              const canDelete = Boolean(currentUser && (currentUser.role === 'admin' || currentUserId === ownerId));
              return (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <CourseCard
                    course={course}
                    showStatus
                    onDelete={canDelete ? handleDeleteCourse : undefined}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
