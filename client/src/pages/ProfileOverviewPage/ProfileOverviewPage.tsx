import React from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
} from '@mui/material';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { useProfileOverviewPage } from './useProfileOverviewPage';
import { ProfileHeaderPaper } from './ProfileOverviewPage.styles';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { EditCourseModal } from '../../components/EditCourseModal/EditCourseModal';
import { Course } from '../../types/course';
import { colors } from '../../theme/theme';

export const ProfileOverviewPage: React.FC = () => {
  const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);
  const {
    currentUser,
    user,
    uploads,
    loading,
    isSelf,
    editModalOpen,
    editName,
    setEditName,
    editAbout,
    setEditAbout,
    saving,
    editError,
    handleOpenEditModal,
    handleCloseEditModal,
    handleSaveProfile,
    handleDeleteCourse,
    fetchProfileData,
  } = useProfileOverviewPage();
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

              <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 2 }}>
                {user?.email} · Member of Neuroculas Courses Community
              </Typography>

              {/* About / Bio Section */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 3,
                  p: 2,
                  mb: 2.5,
                  maxWidth: 640,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 18, color: colors.primaryDark }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: colors.textMain }}>
                    About
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: user?.about ? colors.textMain : colors.textMuted, fontStyle: user?.about ? 'normal' : 'italic', lineHeight: 1.6 }}>
                  {user?.about ? user.about : (isSelf ? 'No bio added yet. Click "Edit Profile" to add an About description!' : 'No bio provided.')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
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

                {isSelf && (
                  <Button
                    variant="outlined"
                    startIcon={<EditRoundedIcon />}
                    onClick={handleOpenEditModal}
                    sx={{
                      borderColor: colors.border,
                      color: colors.primaryDark,
                      fontWeight: 700,
                      bgcolor: '#FFFFFF',
                      '&:hover': {
                        borderColor: colors.primaryDark,
                        bgcolor: colors.veryLight,
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
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
              const canManage = Boolean(currentUser && (currentUser.role === 'admin' || currentUserId === ownerId));
              return (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <CourseCard
                    course={course}
                    showStatus
                    onEdit={canManage ? (c) => setEditingCourse(c) : undefined}
                    onDelete={canManage ? handleDeleteCourse : undefined}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* ── Edit Profile Modal ──────────────────────────────────────── */}
        <Dialog
          open={editModalOpen}
          onClose={handleCloseEditModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 5,
              border: '1.5px solid #BAE6FD',
              boxShadow: '0 20px 60px rgba(56, 189, 248, 0.20)',
              p: 1,
              maxHeight: '90vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
                width: 0,
                height: 0,
              },
            },
          }}
        >
          <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 3,
                  bgcolor: '#E0F2FE',
                  border: '1px solid #BAE6FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284C7',
                }}
              >
                <EditRoundedIcon />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                  Edit Profile
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Update your user name and bio/about details.
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleCloseEditModal} disabled={saving} size="small">
              <CloseRoundedIcon />
            </IconButton>
          </DialogTitle>

          <form onSubmit={handleSaveProfile}>
            <DialogContent
              sx={{
                pt: 1,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                maxHeight: 'calc(85vh - 130px)',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                  width: 0,
                  height: 0,
                },
              }}
            >
              {editError && <Alert severity="error" sx={{ borderRadius: 3 }}>{editError}</Alert>}

              <TextField
                label="User Name"
                fullWidth
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                helperText="Must be unique across Neuroculas Courses"
              />

              <TextField
                label="About / Bio (Optional)"
                placeholder="Tell the community about your background, interests, or expertise..."
                fullWidth
                multiline
                rows={4}
                value={editAbout}
                onChange={(e) => setEditAbout(e.target.value)}
              />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
              <Button onClick={handleCloseEditModal} disabled={saving} sx={{ fontWeight: 700, color: '#64748B' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <EditRoundedIcon />}
                sx={{
                  bgcolor: '#0284C7',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  px: 3,
                  borderRadius: 3,
                  '&:hover': { bgcolor: '#0369A1' },
                }}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* ══ EDIT MATERIAL MODAL ════════════════════════════════════════ */}
        <EditCourseModal
          open={Boolean(editingCourse)}
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSuccess={() => fetchProfileData()}
        />

      </Container>
    </Box>
  );
};
