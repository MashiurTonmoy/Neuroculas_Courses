import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useNavigate } from 'react-router-dom';
import { useModerationQueuePage } from './useModerationQueuePage';
import { TableContainerPaper } from './ModerationQueuePage.styles';
import { FileTypeIcon } from '../../components/FileTypeIcon/FileTypeIcon';
import { colors } from '../../theme/theme';

export const ModerationQueuePage: React.FC = () => {
  const { pendingCourses, loading, handleApprove, handleReject } = useModerationQueuePage();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
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
              bgcolor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HourglassTopRoundedIcon sx={{ color: colors.warning, fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain, lineHeight: 1.2 }}>
              Moderation Queue
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              {pendingCourses.length} file{pendingCourses.length !== 1 ? 's' : ''} awaiting review
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : pendingCourses.length === 0 ? (
          <Box
            sx={{
              p: 7,
              bgcolor: colors.bgCard,
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}
          >
            <CheckCircleOutlineRoundedIcon sx={{ fontSize: 52, color: colors.success, mb: 2 }} />
            <Typography variant="h6" sx={{ color: colors.success, mb: 1 }}>
              Queue is empty!
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              All uploaded files have been reviewed.
            </Typography>
          </Box>
        ) : (
          <TableContainerPaper elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File</TableCell>
                  <TableCell>Uploader</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingCourses.map((course) => {
                  const ownerName = typeof course.owner === 'object' ? course.owner.name : 'Creator';
                  return (
                    <TableRow key={course._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <FileTypeIcon fileUrl={course.fileUrl} variant="badge" size={36} />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: colors.textMain,
                                maxWidth: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {course.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.textMuted }}>
                              {new Date(course.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: colors.soft,
                              color: colors.primary,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                            }}
                          >
                            {ownerName[0].toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                            {ownerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                          {course.language}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={course.price === 0 ? 'FREE' : `${course.price} ৳`}
                          size="small"
                          sx={{
                            bgcolor: course.price === 0 ? '#DCFCE7' : colors.soft,
                            color: course.price === 0 ? '#15803D' : colors.primaryDark,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center' }}>
                          <Tooltip title="View File">
                            <IconButton
                              onClick={() => navigate(`/courses/${course._id}`)}
                              size="small"
                              sx={{ color: colors.textSecondary, '&:hover': { bgcolor: colors.veryLight } }}
                            >
                              <VisibilityRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<CheckCircleRoundedIcon />}
                            onClick={() => handleApprove(course._id)}
                            sx={{
                              bgcolor: '#DCFCE7',
                              color: '#15803D',
                              fontWeight: 700,
                              boxShadow: 'none',
                              '&:hover': { bgcolor: '#BBF7D0' },
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<CancelRoundedIcon />}
                            onClick={() => handleReject(course._id)}
                            sx={{
                              borderColor: '#FECACA',
                              color: colors.error,
                              fontWeight: 700,
                              '&:hover': { borderColor: colors.error, bgcolor: '#FEE2E2' },
                            }}
                          >
                            Reject
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainerPaper>
        )}
      </Container>
    </Box>
  );
};
