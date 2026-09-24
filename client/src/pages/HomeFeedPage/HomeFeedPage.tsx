import React from 'react';
import { Container, Typography, Box, Button, Grid, CircularProgress, Divider } from '@mui/material';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import RecyclingRoundedIcon from '@mui/icons-material/RecyclingRounded';
import EnergySavingsLeafRoundedIcon from '@mui/icons-material/EnergySavingsLeafRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import { useNavigate } from 'react-router-dom';
import { useHomeFeedPage } from './useHomeFeedPage';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { HeroContainer, MissionBanner } from './HomeFeedPage.styles';
import { colors } from '../../theme/theme';

// ── Tagline word pills ────────────────────────────────────────────────────────
const taglineWords = ['Create', 'Learn', 'Share', 'Save', 'Sell', 'Buy'];

const Tagline: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: { xs: 0.5, md: 1 },
      mb: 3.5,
    }}
  >
    {taglineWords.map((word, i) => (
      <React.Fragment key={word}>
        <Box
          component="span"
          sx={{
            px: { xs: 1.5, md: 2 },
            py: { xs: 0.5, md: 0.75 },
            borderRadius: 99,
            bgcolor: i % 2 === 0 ? colors.soft : colors.veryLight,
            border: `1px solid ${colors.border}`,
            fontWeight: 800,
            fontSize: { xs: '0.9rem', md: '1.05rem' },
            color: colors.primaryDark,
            letterSpacing: '0.01em',
            lineHeight: 1,
          }}
        >
          {word}
        </Box>
        {i < taglineWords.length - 1 && (
          <Box
            component="span"
            sx={{
              color: colors.border,
              fontWeight: 400,
              fontSize: { xs: '0.85rem', md: '1rem' },
              userSelect: 'none',
            }}
          >
            ·
          </Box>
        )}
      </React.Fragment>
    ))}
  </Box>
);

// ── Mission cards data ────────────────────────────────────────────────────────
const missionCards = [
  {
    icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />,
    title: 'AI-Powered Creation',
    body: 'Use AI to instantly generate comprehensive learning materials — notes, summaries, exercises, flashcards — on any subject, at any depth.',
  },
  {
    icon: <RecyclingRoundedIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />,
    title: 'Reuse Before You Regenerate',
    body: 'Before asking AI to create something new, search Neuroculas first. Refine and build on what already exists instead of starting from scratch every time.',
  },
  {
    icon: <EnergySavingsLeafRoundedIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />,
    title: 'Sustainable Learning',
    body: 'Every reuse saves real-world resources — AI tokens, compute cycles, electricity, and fresh water. Together we make learning more efficient and responsible.',
  },
];

// ── Modern Sustainability Impact Metrics ──────────────────────────────────────
const sustainabilityMetrics = [
  {
    icon: <TokenRoundedIcon sx={{ fontSize: 24, color: '#0284C7' }} />,
    bg: '#E0F2FE',
    border: '#BAE6FD',
    title: 'Tokens Saved',
    subtitle: 'Prevents redundant LLM token generations',
  },
  {
    icon: <MemoryRoundedIcon sx={{ fontSize: 24, color: '#4F46E5' }} />,
    bg: '#EEF2FF',
    border: '#C7D2FE',
    title: 'Compute Cycles Reduced',
    subtitle: 'Minimizes GPU & data center load',
  },
  {
    icon: <ElectricBoltRoundedIcon sx={{ fontSize: 24, color: '#D97706' }} />,
    bg: '#FEF3C7',
    border: '#FDE68A',
    title: 'Energy Conserved',
    subtitle: 'Lowers kilowatt-hour power footprint',
  },
  {
    icon: <WaterDropRoundedIcon sx={{ fontSize: 24, color: '#0891B2' }} />,
    bg: '#E0F2FE',
    border: '#A5F3FC',
    title: 'Water Usage Lowered',
    subtitle: 'Reduces data center cooling consumption',
  },
];

export const HomeFeedPage: React.FC = () => {
  const { courses, loading, user, handleDeleteCourse } = useHomeFeedPage();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'transparent' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <HeroContainer>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>

          {/* Logo mark */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              boxShadow: '0 8px 24px rgba(96,165,250,0.30)',
              mb: 3,
            }}
          >
            <AutoStoriesRoundedIcon sx={{ color: '#FFF', fontSize: 30 }} />
          </Box>

          {/* Sharp Brand Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.4rem', md: '4.2rem' },
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              mb: 2.5,
              color: '#0F172A',
            }}
          >
            Neuroculas <span style={{ color: '#2563EB' }}>Courses</span>
          </Typography>

          {/* Tagline pills */}
          <Tagline />

          {/* Bold, Precise Sub-headline */}
          <Typography
            variant="body1"
            sx={{
              color: '#1E293B',
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              lineHeight: 1.7,
              fontWeight: 700,
              maxWidth: 640,
              mx: 'auto',
              mb: 4.5,
            }}
          >
            <span style={{ color: '#1D4ED8' }}>Use AI to generate learning materials</span> on any topic and share them here.{' '}
            <span style={{ color: '#2563EB' }}>Discover, reuse, and refine</span> what the community has already built — so{' '}
            <span style={{ color: '#1D4ED8', textDecoration: 'underline decoration-2 decoration-sky-400' }}>no knowledge gets generated twice</span>.
          </Typography>

          {/* CTAs */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/explore')}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                fontWeight: 800,
                px: 4,
                py: 1.5,
                fontSize: '0.95rem',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                boxShadow: '0 6px 20px rgba(96,165,250,0.35)',
                '&:hover': { boxShadow: '0 8px 28px rgba(96,165,250,0.48)' },
              }}
            >
              Explore Learning Materials
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/upload')}
              sx={{
                borderColor: colors.border,
                color: colors.textMain,
                fontWeight: 700,
                px: 4,
                py: 1.5,
                fontSize: '0.95rem',
                bgcolor: colors.bgCard,
                '&:hover': {
                  borderColor: colors.primary,
                  color: colors.primary,
                  bgcolor: colors.veryLight,
                },
              }}
            >
              Share Your Materials
            </Button>
          </Box>
        </Container>
      </HeroContainer>

      <Container maxWidth="lg" sx={{ py: 8 }}>

        {/* ══ AI MISSION BANNER ══════════════════════════════════════════ */}
        <MissionBanner sx={{ mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.20)',
                borderRadius: 99,
                px: 2,
                py: 0.6,
                mb: 2,
              }}
            >
              <TipsAndUpdatesRoundedIcon sx={{ fontSize: 16, color: '#FFF' }} />
              <Typography variant="caption" sx={{ color: '#FFF', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                Our Philosophy
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#FFF',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1.5,
                letterSpacing: '-0.5px',
              }}
            >
              Smarter AI, Shared Knowledge
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.80)',
                maxWidth: 620,
                mx: 'auto',
                lineHeight: 1.65,
                fontSize: '0.97rem',
              }}
            >
              Every AI-generated document costs real resources. We believe the best response
              to that is not to stop using AI — but to <em>share what we create</em>, so the same
              knowledge never has to be generated twice.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {missionCards.map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    p: 3,
                    height: '100%',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.2s ease',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFF', mb: 1, fontSize: '1rem' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>
                    {card.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </MissionBanner>

        {/* ══ MODERN SUSTAINABILITY IMPACT SECTION ═══════════════════════ */}
        <Grid container spacing={2.5} sx={{ mb: 8 }}>
          {sustainabilityMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={3} key={metric.title}>
              <Box
                sx={{
                  bgcolor: colors.bgCard,
                  borderRadius: 4,
                  border: `1px solid ${colors.border}`,
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  height: '100%',
                  boxShadow: '0 2px 10px rgba(96,165,250,0.06)',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 24px rgba(96,165,250,0.14)',
                    borderColor: colors.primaryLight,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: metric.bg,
                    border: `1px solid ${metric.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {metric.icon}
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 800, color: colors.textMain, fontSize: '0.92rem', lineHeight: 1.25, mb: 0.3 }}
                  >
                    {metric.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.75rem', lineHeight: 1.3, display: 'block' }}>
                    {metric.subtitle}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: colors.border, mb: 8 }} />

        {/* ══ TRENDING FEED ══════════════════════════════════════════════ */}
        <Box sx={{ mb: 8 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain, mb: 0.5 }}>
                Latest Learning Materials
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                Freshly shared by the Neuroculas community
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => navigate('/explore')}
              sx={{
                color: colors.primary,
                fontWeight: 700,
                '&:hover': { bgcolor: colors.veryLight },
                flexShrink: 0,
              }}
            >
              Browse All
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
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
              <SpeedRoundedIcon sx={{ fontSize: 52, color: colors.border, mb: 2 }} />
              <Typography variant="h6" sx={{ color: colors.textMain, mb: 1 }}>
                No materials published yet
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
                Be the first to generate and share learning content!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/upload')}
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  color: '#FFF',
                  fontWeight: 700,
                }}
              >
                Upload First Material
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {courses.map((course) => {
                const currentUserId = user?._id || user?.id;
                const ownerId = typeof course.owner === 'object' && course.owner !== null ? (course.owner._id || course.owner.id) : course.owner;
                const canDelete = Boolean(user && (user.role === 'admin' || currentUserId === ownerId));
                return (
                  <Grid item xs={12} sm={6} md={4} key={course._id}>
                    <CourseCard
                      course={course}
                      onDelete={canDelete ? handleDeleteCourse : undefined}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>

      </Container>
    </Box>
  );
};
