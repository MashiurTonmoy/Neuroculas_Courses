import React from 'react';
import { CardContent, Typography, Box, Avatar, Rating, IconButton, Tooltip, Chip, Divider } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types/course';
import { StyledCourseCard, CardHeaderBanner, EmblemContainer, FooterRibbon } from './CourseCard.styles';
import { FileTypeIcon, getFileType, FILE_TYPE_CONFIG } from '../FileTypeIcon/FileTypeIcon';

interface CourseCardProps {
  course: Course;
  showStatus?: boolean;
  onDelete?: (id: string) => void;
  onDownload?: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showStatus = false,
  onDelete,
  onDownload,
}) => {
  const navigate = useNavigate();

  const ownerName = typeof course.owner === 'object' ? course.owner.name : 'Creator';
  const ownerAvatar = typeof course.owner === 'object' ? course.owner.avatar : '';
  const ownerId = typeof course.owner === 'object' ? (course.owner._id || course.owner.id) : course.owner;

  const fileType = getFileType(course.fileUrl);
  const fileConfig = FILE_TYPE_CONFIG[fileType];

  const handleCardClick = () => {
    navigate(`/courses/${course._id}`);
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ownerId) {
      navigate(`/profile/${ownerId}`);
    }
  };

  return (
    <StyledCourseCard onClick={handleCardClick}>
      {/* ── Top Light Blue Wavy Banner ─────────────────────────────────── */}
      <CardHeaderBanner>
        {/* Top-Left: Price Badge */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <Chip
            icon={<StarBorderRoundedIcon sx={{ fontSize: 16, color: '#0284C7 !important' }} />}
            label={course.price === 0 ? 'Free' : `${course.price} ৳`}
            size="small"
            sx={{
              bgcolor: '#E0F2FE',
              color: '#0284C7',
              border: '1px solid #BAE6FD',
              fontWeight: 800,
              fontSize: '0.82rem',
              height: 30,
              borderRadius: 99,
              px: 0.5,
            }}
          />
        </Box>

        {/* Center: Overlapping Circular Emblem Badge */}
        <EmblemContainer>
          <FileTypeIcon fileUrl={course.fileUrl} variant="badge" size={40} />
        </EmblemContainer>
      </CardHeaderBanner>

      {/* ── Card Content Body ─────────────────────────────────────────── */}
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: '1.15rem',
            color: '#0F172A',
            letterSpacing: '-0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.35,
          }}
        >
          {course.title}
        </Typography>

        {/* Description Snippet */}
        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            fontSize: '0.85rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.55,
          }}
        >
          {course.description}
        </Typography>

        {/* Rating Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Rating
            value={course.avgRating || 0}
            precision={0.5}
            size="small"
            readOnly
            sx={{
              fontSize: '0.95rem',
              '& .MuiRating-iconFilled': { color: '#38BDF8' },
              '& .MuiRating-iconEmpty': { color: '#CBD5E1' },
            }}
          />
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, fontSize: '0.82rem' }}>
            {course.avgRating ? course.avgRating.toFixed(1) : '0.0'} ({course.totalReviews || 0})
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#F1F5F9', my: 0.5 }} />

        {/* ── Dark Navy Pill Ribbon Footer ─────────────────────────────── */}
        <Tooltip title={`View ${ownerName}'s profile & all uploaded files`}>
          <FooterRibbon onClick={handleUserClick}>
            <Avatar
              src={ownerAvatar}
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#334155',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 800,
                border: '2px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              {ownerName ? ownerName[0].toUpperCase() : 'U'}
            </Avatar>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: '#FFFFFF',
                fontSize: '0.9rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flexGrow: 1,
              }}
            >
              {ownerName}
            </Typography>

            {/* Quick Action Icons inside ribbon */}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {onDownload && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(course);
                  }}
                  sx={{ color: 'rgba(255, 255, 255, 0.85)', p: 0.5, '&:hover': { color: '#FFF', bgcolor: 'rgba(255, 255, 255, 0.15)' } }}
                >
                  <DownloadRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
              {onDelete && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(course._id);
                  }}
                  sx={{ color: '#F87171', p: 0.5, '&:hover': { color: '#EF4444', bgcolor: 'rgba(239, 68, 68, 0.2)' } }}
                >
                  <DeleteRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>
          </FooterRibbon>
        </Tooltip>
      </CardContent>
    </StyledCourseCard>
  );
};
