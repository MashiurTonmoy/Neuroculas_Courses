import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useMyLibraryPage } from './useMyLibraryPage';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { colors } from '../../theme/theme';

export const MyLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, loading, handleDownload } = useMyLibraryPage();

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

        {/* ── Header ──────────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
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
            <LocalLibraryRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain }}>
            My Library &amp; Purchased Files
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 4, ml: 7 }}>
          Access and download all digital files and courses you have enrolled in.
        </Typography>

        {/* ── Content ─────────────────────────────────────────────────── */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : courses.length === 0 ? (
          <Box
            sx={{
              p: 7,
              bgcolor: colors.bgCard,
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
          >
            <ShoppingBagRoundedIcon sx={{ fontSize: 52, color: colors.border, mb: 2 }} />
            <Typography variant="h6" sx={{ color: colors.textMain, mb: 1 }}>
              Your library is empty
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
              Explore the marketplace to enroll in free or premium digital courses.
            </Typography>
            <Button
              variant="contained"
              href="/explore"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                color: '#FFF',
                fontWeight: 700,
                '&:hover': { boxShadow: '0 6px 18px rgba(96,165,250,0.35)' },
              }}
            >
              Browse Marketplace
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <CourseCard
                  course={course}
                  onDownload={(c) => handleDownload(c._id, c.title)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
