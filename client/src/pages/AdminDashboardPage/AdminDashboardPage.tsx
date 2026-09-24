import React from 'react';
import { Container, Typography, Box, Grid, CircularProgress, Button } from '@mui/material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import { useAdminDashboardPage } from './useAdminDashboardPage';
import { StatCardPaper } from './AdminDashboardPage.styles';
import { colors } from '../../theme/theme';

export const AdminDashboardPage: React.FC = () => {
  const { stats, loading } = useAdminDashboardPage();
  const navigate = useNavigate();

  const statCards = [
    {
      icon: <PeopleRoundedIcon sx={{ fontSize: 28, color: '#3B82F6' }} />,
      iconBg: '#EFF6FF',
      value: stats?.users || 0,
      label: 'Total Users',
    },
    {
      icon: <FolderRoundedIcon sx={{ fontSize: 28, color: colors.success }} />,
      iconBg: '#DCFCE7',
      value: stats?.courses.total || 0,
      label: 'Total Files',
    },
    {
      icon: <HourglassTopRoundedIcon sx={{ fontSize: 28, color: colors.warning }} />,
      iconBg: '#FEF3C7',
      value: stats?.courses.pending || 0,
      label: 'Pending Approval',
      highlight: true,
    },
    {
      icon: <CurrencyRupeeRoundedIcon sx={{ fontSize: 28, color: colors.primary }} />,
      iconBg: colors.soft,
      value: `${stats?.totalRevenue || 0} ৳`,
      label: 'Total Revenue',
    },
  ];

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, flexWrap: 'wrap', gap: 2 }}>
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
              <AdminPanelSettingsRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain }}>
              Admin Dashboard
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            startIcon={<GavelRoundedIcon />}
            onClick={() => navigate('/admin/moderation')}
            sx={{
              background: `linear-gradient(135deg, ${colors.warning} 0%, #D97706 100%)`,
              color: '#FFF',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(245,158,11,0.30)',
              '&:hover': { boxShadow: '0 6px 18px rgba(245,158,11,0.40)' },
            }}
          >
            Moderation Queue ({stats?.courses.pending || 0})
          </Button>
        </Box>

        {/* ── Stat Cards ──────────────────────────────────────────────── */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {statCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.label}>
                <StatCardPaper elevation={0}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: card.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: card.highlight ? colors.warning : colors.textMain,
                      fontSize: '2rem',
                      mb: 0.5,
                    }}
                  >
                    {card.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    {card.label}
                  </Typography>
                </StatCardPaper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
