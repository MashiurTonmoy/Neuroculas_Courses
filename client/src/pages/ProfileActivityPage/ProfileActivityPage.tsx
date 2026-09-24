import React from 'react';
import { Container, Typography, Box, Chip, CircularProgress, Button } from '@mui/material';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import { useNavigate } from 'react-router-dom';
import { useProfileActivityPage } from './useProfileActivityPage';
import { ActivityTimelinePaper } from './ProfileActivityPage.styles';
import { FileTypeIcon } from '../../components/FileTypeIcon/FileTypeIcon';
import { colors } from '../../theme/theme';

export const ProfileActivityPage: React.FC = () => {
  const { uploads, loading } = useProfileActivityPage();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: colors.textSecondary, mb: 3, '&:hover': { bgcolor: colors.veryLight } }}
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
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
            <TimelineRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain, lineHeight: 1.2 }}>
              Activity &amp; Upload Feed
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              {uploads.length} recent upload{uploads.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : uploads.length === 0 ? (
          <Box
            sx={{
              p: 6,
              bgcolor: colors.bgCard,
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
          >
            <InboxRoundedIcon sx={{ fontSize: 48, color: colors.border, mb: 1.5 }} />
            <Typography variant="body1" sx={{ color: colors.textSecondary }}>
              No recent file upload activity recorded.
            </Typography>
          </Box>
        ) : (
          uploads.map((item) => (
            <ActivityTimelinePaper key={item._id} elevation={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <FileTypeIcon fileUrl={item.fileUrl} variant="compact" size={18} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <CloudUploadOutlinedIcon sx={{ color: colors.primary, fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.textMain, fontSize: '0.88rem' }}>
                      Uploaded Course File
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={item.status.toUpperCase()}
                  size="small"
                  sx={{
                    bgcolor: item.status === 'approved' ? '#DCFCE7' : item.status === 'rejected' ? '#FEE2E2' : '#FEF3C7',
                    color: item.status === 'approved' ? '#15803D' : item.status === 'rejected' ? '#B91C1C' : '#B45309',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    height: 22,
                  }}
                />
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colors.textMain, mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors.textSecondary,
                  mb: 1.5,
                  lineHeight: 1.55,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {item.description}
              </Typography>

              <Typography variant="caption" sx={{ color: colors.textMuted }}>
                Published on {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </ActivityTimelinePaper>
          ))
        )}
      </Container>
    </Box>
  );
};
