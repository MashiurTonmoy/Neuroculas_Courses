import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Avatar,
  Rating,
  Chip,
  CircularProgress,
  TextField,
  Alert,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useCourseDetailPage } from './useCourseDetailPage';
import { DetailPaper, ReviewPaper } from './CourseDetailPage.styles';
import { FileTypeIcon, getFileType, FILE_TYPE_CONFIG } from '../../components/FileTypeIcon/FileTypeIcon';
import { colors } from '../../theme/theme';

export const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    course,
    reviews,
    loading,
    downloading,
    rating,
    setRating,
    comment,
    setComment,
    reviewSubmitting,
    reviewError,
    reviewSuccess,
    handleEnrollOrDownload,
    handleReviewSubmit,
    handleDeleteCourse,
    deleting,
    isAuthenticated,
    user,
  } = useCourseDetailPage();

  if (loading) {
    return (
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: colors.textMain }}>Course / File not found</Typography>
      </Box>
    );
  }

  const ownerName = typeof course.owner === 'object' ? course.owner.name : 'Creator';
  const ownerEmail = typeof course.owner === 'object' ? course.owner.email : '';
  const fileType = getFileType(course.fileUrl);
  const fileConfig = FILE_TYPE_CONFIG[fileType];

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

        {/* ── Course Header ────────────────────────────────────────────── */}
        <DetailPaper elevation={0}>
          <Grid container spacing={4} alignItems="flex-start">
            {/* File icon panel */}
            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  bgcolor: fileConfig.bg,
                  borderRadius: 4,
                  p: 4,
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <FileTypeIcon fileUrl={course.fileUrl} variant="large" size={72} />
                <Chip
                  label={course.price === 0 ? 'FREE' : `${course.price} ৳`}
                  sx={{
                    bgcolor: course.price === 0 ? '#DCFCE7' : colors.soft,
                    color: course.price === 0 ? '#15803D' : colors.primaryDark,
                    fontWeight: 800,
                    fontSize: '0.9rem',
                  }}
                />
              </Box>
            </Grid>

            {/* Info panel */}
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<LanguageRoundedIcon sx={{ fontSize: 14, color: `${colors.info} !important` }} />}
                  label={course.language}
                  size="small"
                  sx={{ bgcolor: '#EFF6FF', color: colors.info, fontWeight: 600, border: '1px solid #BFDBFE' }}
                />
                <Chip
                  label={course.status.toUpperCase()}
                  size="small"
                  sx={{
                    bgcolor: course.status === 'approved' ? '#DCFCE7' : '#FEF3C7',
                    color: course.status === 'approved' ? '#15803D' : '#B45309',
                    fontWeight: 700,
                    border: `1px solid ${course.status === 'approved' ? '#BBF7D0' : '#FDE68A'}`,
                  }}
                />
                {course.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ bgcolor: colors.veryLight, color: colors.textSecondary, border: `1px solid ${colors.border}` }}
                  />
                ))}
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.7rem', md: '2.2rem' }, color: colors.textMain, lineHeight: 1.2 }}>
                {course.title}
              </Typography>

              <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3, lineHeight: 1.65 }}>
                {course.description}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Rating value={course.avgRating || 0} precision={0.5} readOnly />
                <Typography variant="body1" sx={{ fontWeight: 700, color: colors.textMain }}>
                  {course.avgRating ? course.avgRating.toFixed(1) : '0.0'}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                  ({course.totalReviews} review{course.totalReviews !== 1 ? 's' : ''})
                </Typography>
              </Box>

              {/* Creator */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 4,
                  p: 2,
                  bgcolor: colors.veryLight,
                  borderRadius: 3,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    width: 42,
                    height: 42,
                    fontWeight: 700,
                    color: '#FFF',
                  }}
                >
                  {ownerName[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.textMain }}>
                    {ownerName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                    Publisher · {ownerEmail}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DownloadRoundedIcon />}
                  disabled={downloading}
                  onClick={handleEnrollOrDownload}
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    color: '#FFF',
                    fontWeight: 800,
                    px: 4,
                    py: 1.5,
                    boxShadow: '0 6px 18px rgba(96,165,250,0.30)',
                    '&:hover': { boxShadow: '0 8px 24px rgba(96,165,250,0.40)' },
                  }}
                >
                  {downloading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : `Enroll & Download (${course.price === 0 ? 'Free' : course.price + ' ৳'})`}
                </Button>

                {user && (user.role === 'admin' || (user._id || user.id) === (typeof course.owner === 'object' && course.owner !== null ? (course.owner._id || course.owner.id) : course.owner)) && (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<DeleteRoundedIcon />}
                    disabled={deleting}
                    onClick={handleDeleteCourse}
                    sx={{
                      borderColor: '#FECACA',
                      color: colors.error,
                      fontWeight: 700,
                      px: 3,
                      py: 1.5,
                      '&:hover': { borderColor: colors.error, bgcolor: '#FEE2E2' },
                    }}
                  >
                    {deleting ? <CircularProgress size={22} color="error" /> : 'Delete File'}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </DetailPaper>

        {/* ── Reviews Section ─────────────────────────────────────────── */}
        <Grid container spacing={3}>
          {/* Write Review */}
          <Grid item xs={12} md={5}>
            <DetailPaper elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <RateReviewRoundedIcon sx={{ color: colors.primary, fontSize: 22 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: colors.textMain }}>
                  Write a Review
                </Typography>
              </Box>

              {!isAuthenticated ? (
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  Please log in to submit a review for this file.
                </Alert>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  {reviewError && <Alert severity="error" sx={{ mb: 2 }}>{reviewError}</Alert>}
                  {reviewSuccess && <Alert severity="success" sx={{ mb: 2 }}>{reviewSuccess}</Alert>}

                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: colors.textSecondary, fontWeight: 600 }}>
                      Your Rating
                    </Typography>
                    <Rating
                      value={rating}
                      onChange={(_, newValue) => setRating(newValue)}
                      size="large"
                    />
                  </Box>

                  <TextField
                    label="Your review feedback..."
                    fullWidth
                    multiline
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mb: 2.5 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={reviewSubmitting}
                    sx={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                      color: '#FFF',
                      py: 1.3,
                      fontWeight: 700,
                      '&:hover': { boxShadow: '0 6px 16px rgba(96,165,250,0.30)' },
                    }}
                  >
                    {reviewSubmitting ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Submit Review'}
                  </Button>
                </form>
              )}
            </DetailPaper>
          </Grid>

          {/* Reviews List */}
          <Grid item xs={12} md={7}>
            <DetailPaper elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <ForumRoundedIcon sx={{ color: colors.primary, fontSize: 22 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: colors.textMain }}>
                  Community Reviews ({reviews.length})
                </Typography>
              </Box>

              {reviews.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <StarRoundedIcon sx={{ fontSize: 40, color: colors.border, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    No reviews yet. Be the first to share your feedback!
                  </Typography>
                </Box>
              ) : (
                reviews.map((rev) => (
                  <ReviewPaper key={rev._id} elevation={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: colors.soft,
                            color: colors.primary,
                            width: 32,
                            height: 32,
                            fontSize: '0.82rem',
                            fontWeight: 700,
                          }}
                        >
                          {rev.reviewer?.name ? rev.reviewer.name[0].toUpperCase() : <PersonRoundedIcon sx={{ fontSize: 16 }} />}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.textMain, fontSize: '0.85rem' }}>
                            {rev.reviewer?.name || 'Anonymous User'}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating value={rev.rating} precision={0.5} size="small" readOnly />
                    </Box>
                    {rev.comment && (
                      <Typography variant="body2" sx={{ color: colors.textSecondary, mt: 0.75, lineHeight: 1.55, pl: '46px' }}>
                        "{rev.comment}"
                      </Typography>
                    )}
                  </ReviewPaper>
                ))
              )}
            </DetailPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
