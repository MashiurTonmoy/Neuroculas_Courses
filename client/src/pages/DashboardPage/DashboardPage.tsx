import React from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useDashboardPage } from './useDashboardPage';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { UploadModal } from '../../components/UploadModal/UploadModal';
import { DashboardTabPaper } from './DashboardPage.styles';
import { colors } from '../../theme/theme';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    tab,
    setTab,
    myPurchases,
    myUploads,
    loading,
    uploadModalOpen,
    setUploadModalOpen,
    handleDeleteCourse,
    fetchDashboardData,
  } = useDashboardPage();

  const EmptyState = ({
    icon,
    title,
    subtitle,
    action,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    action?: React.ReactNode;
  }) => (
    <Box
      sx={{
        p: 7,
        bgcolor: colors.bgCard,
        borderRadius: 4,
        border: `1px solid ${colors.border}`,
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>{icon}</Box>
      <Typography variant="h6" sx={{ color: colors.textMain, mb: 0.75 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textSecondary, mb: action ? 3 : 0 }}>
        {subtitle}
      </Typography>
      {action}
    </Box>
  );

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
              <DashboardRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain, lineHeight: 1.2 }}>
                Creator Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                Welcome back, {user?.name || 'Creator'}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<CloudUploadRoundedIcon />}
            onClick={() => setUploadModalOpen(true)}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              color: '#FFF',
              fontWeight: 700,
              px: 3,
              py: 1.2,
              boxShadow: '0 4px 14px rgba(96,165,250,0.30)',
              '&:hover': { boxShadow: '0 6px 20px rgba(96,165,250,0.40)' },
            }}
          >
            Upload New File
          </Button>
        </Box>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <DashboardTabPaper sx={{ mb: 4, p: 0 }} elevation={0}>
          <Tabs
            value={tab}
            onChange={(_, val) => setTab(val)}
            sx={{
              px: 2,
              '& .MuiTabs-indicator': { bgcolor: colors.primary, height: 3, borderRadius: 2 },
              '& .MuiTab-root': { color: colors.textSecondary, fontWeight: 600, py: 2 },
              '& .Mui-selected': { color: colors.primary, fontWeight: 700 },
            }}
          >
            <Tab
              icon={<CloudUploadOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label={`My Uploads (${myUploads.length})`}
            />
            <Tab
              icon={<LocalLibraryOutlinedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label={`Enrolled Library (${myPurchases.length})`}
            />
          </Tabs>
        </DashboardTabPaper>

        {/* ── Content ─────────────────────────────────────────────────── */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {tab === 0 && (
              myUploads.length === 0 ? (
                <EmptyState
                  icon={<CloudUploadOutlinedIcon sx={{ fontSize: 52, color: colors.border }} />}
                  title="You haven't uploaded any courses yet"
                  subtitle="Start sharing your knowledge with the world"
                  action={
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadRoundedIcon />}
                      onClick={() => setUploadModalOpen(true)}
                      sx={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                        color: '#FFF',
                        fontWeight: 700,
                      }}
                    >
                      Upload Your First File
                    </Button>
                  }
                />
              ) : (
                <Grid container spacing={2.5}>
                  {myUploads.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course._id}>
                      <CourseCard
                        course={course}
                        showStatus
                        onDelete={handleDeleteCourse}
                      />
                    </Grid>
                  ))}
                </Grid>
              )
            )}

            {tab === 1 && (
              myPurchases.length === 0 ? (
                <EmptyState
                  icon={<ShoppingBagRoundedIcon sx={{ fontSize: 52, color: colors.border }} />}
                  title="No enrolled courses in your library"
                  subtitle="Browse the marketplace to find courses and digital assets"
                  action={
                    <Button
                      variant="contained"
                      href="/explore"
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                        color: '#FFF',
                        fontWeight: 700,
                      }}
                    >
                      Browse Marketplace
                    </Button>
                  }
                />
              ) : (
                <Grid container spacing={2.5}>
                  {myPurchases.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course._id}>
                      <CourseCard course={course} />
                    </Grid>
                  ))}
                </Grid>
              )
            )}
          </>
        )}
      </Container>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={() => { setUploadModalOpen(false); fetchDashboardData(); }}
      />
    </Box>
  );
};
