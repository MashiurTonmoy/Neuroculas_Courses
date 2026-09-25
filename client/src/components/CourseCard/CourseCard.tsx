import React from 'react';
import { CardContent, Typography, Box, Avatar, Rating, IconButton, Tooltip, Chip, Divider } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types/course';
import { StyledCourseCard, CardHeaderBanner, EmblemContainer, FooterRibbon } from './CourseCard.styles';
import { FileTypeIcon, getFileType, FILE_TYPE_CONFIG } from '../FileTypeIcon/FileTypeIcon';

interface CourseCardProps {
  course: Course;
  showStatus?: boolean;
  onEdit?: (course: Course) => void;
  onDelete?: (id: string) => void;
  onDownload?: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showStatus = false,
  onEdit,
  onDelete,
  onDownload,
}) => {
  const navigate = useNavigate();

  const ownerName = typeof course.owner === 'object' ? course.owner.name : 'Creator';
  const ownerAvatar = typeof course.owner === 'object' ? course.owner.avatar : '';
  const ownerId = typeof course.owner === 'object' ? (course.owner._id || course.owner.id) : course.owner;

  const fileType = getFileType(course.fileUrl);

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
      {/* ── 1. Top Decorative Light-Blue Wavy Header Banner ─────────────── */}
      <CardHeaderBanner>
        {/* Background Decorative Fluid Curves SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 320 124"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          {/* Waves */}
          <path
            d="M -10,30 Q 50,110 120,40 T 260,70 T 340,20 L 340,-10 L -10,-10 Z"
            fill="rgba(56, 189, 248, 0.25)"
          />
          <path
            d="M -10,60 Q 60,130 140,50 T 280,90 L 340,60 L 340,-10 L -10,-10 Z"
            fill="rgba(186, 230, 253, 0.35)"
          />
          {/* Accent Shapes */}
          <polygon points="75,35 85,28 82,42" fill="#34D399" opacity="0.85" />
          <circle cx="280" cy="30" r="8" fill="#38BDF8" opacity="0.8" />
          <circle cx="292" cy="22" r="4" fill="#FBBF24" opacity="0.9" />
          
          {/* Dot Matrix Pattern */}
          <g fill="#93C5FD" opacity="0.75">
            <circle cx="225" cy="18" r="1.5" />
            <circle cx="233" cy="18" r="1.5" />
            <circle cx="241" cy="18" r="1.5" />
            <circle cx="249" cy="18" r="1.5" />
            <circle cx="225" cy="26" r="1.5" />
            <circle cx="233" cy="26" r="1.5" />
            <circle cx="241" cy="26" r="1.5" />
            <circle cx="249" cy="26" r="1.5" />
            <circle cx="225" cy="34" r="1.5" />
            <circle cx="233" cy="34" r="1.5" />
            <circle cx="241" cy="34" r="1.5" />
            <circle cx="249" cy="34" r="1.5" />
          </g>
        </svg>

        {/* Top-Left: Price Pill Badge */}
        <Box sx={{ position: 'absolute', top: 12, left: 14, zIndex: 3 }}>
          <Chip
            icon={<StarBorderRoundedIcon sx={{ fontSize: 17, color: '#0284C7 !important' }} />}
            label={course.price === 0 ? 'Free' : `${course.price} ৳`}
            size="small"
            sx={{
              bgcolor: '#FFFFFF',
              color: '#0284C7',
              border: '1.5px solid #38BDF8',
              boxShadow: '0 2px 8px rgba(56, 189, 248, 0.20)',
              fontWeight: 800,
              fontSize: '0.85rem',
              height: 32,
              borderRadius: 99,
              px: 0.75,
              '& .MuiChip-label': { px: 1 },
            }}
          />
        </Box>

        {/* Top-Right: Private Visibility Badge & Edit Pen Icon Button */}
        <Box sx={{ position: 'absolute', top: 12, right: 14, zIndex: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          {course.visibility === 'private' && (
            <Chip
              icon={<LockRoundedIcon sx={{ fontSize: 15, color: '#0284C7 !important' }} />}
              label="Private"
              size="small"
              sx={{
                bgcolor: '#FFFFFF',
                color: '#0284C7',
                border: '1.5px solid #38BDF8',
                boxShadow: '0 2px 8px rgba(56, 189, 248, 0.20)',
                fontWeight: 800,
                fontSize: '0.78rem',
                height: 30,
                borderRadius: 99,
              }}
            />
          )}

          {onEdit && (
            <Tooltip title="Edit Material">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(course);
                }}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#FFFFFF',
                  color: '#0284C7',
                  border: '1.5px solid #38BDF8',
                  boxShadow: '0 2px 8px rgba(56, 189, 248, 0.25)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#E0F2FE',
                    color: '#0369A1',
                    transform: 'scale(1.08)',
                  },
                }}
              >
                <EditRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Center: Overlapping Circular Emblem Badge */}
        <EmblemContainer>
          <FileTypeIcon fileUrl={course.fileUrl} variant="badge" size={42} />
        </EmblemContainer>
      </CardHeaderBanner>

      {/* ── 2. Card Content Body ────────────────────────────────────────── */}
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: '1.25rem',
            color: '#0F172A',
            letterSpacing: '-0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.3,
            mt: 0.5,
          }}
        >
          {course.title}
        </Typography>

        {/* Description Snippet */}
        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            fontWeight: 600,
            fontSize: '0.88rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.5,
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
              fontSize: '1rem',
              '& .MuiRating-iconFilled': { color: '#0284C7' },
              '& .MuiRating-iconEmpty': { color: '#CBD5E1' },
            }}
          />
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.88rem' }}>
            {course.avgRating ? course.avgRating.toFixed(1) : '0.0'} ({course.totalReviews || 0})
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#E2E8F0', my: 1 }} />

        {/* ── 3. Light-Blue Wavy Footer User Pill Card ────────────────────── */}
        <Tooltip title={`View ${ownerName}'s profile & all uploaded files`}>
          <FooterRibbon onClick={handleUserClick}>
            {/* Background Wave Effect for Footer */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 280 50"
              preserveAspectRatio="none"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              <path
                d="M 120,50 C 180,10 220,40 280,0 L 280,50 Z"
                fill="rgba(56, 189, 248, 0.40)"
              />
              <path
                d="M 160,50 C 210,20 250,45 280,15 L 280,50 Z"
                fill="rgba(186, 230, 253, 0.60)"
              />
              <path
                d="M 190,50 Q 235,30 280,42 L 280,50 Z"
                fill="#34D399"
                opacity="0.6"
              />
            </svg>

            {/* Left: User Avatar */}
            <Avatar
              src={ownerAvatar}
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#0B2545',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                fontWeight: 800,
                border: '2.5px solid #38BDF8',
                boxShadow: '0 2px 8px rgba(11, 37, 69, 0.25)',
                zIndex: 2,
              }}
            >
              {ownerName ? ownerName[0].toUpperCase() : 'U'}
            </Avatar>

            {/* Middle: User Name */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: '#0F172A',
                fontSize: '1rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flexGrow: 1,
                zIndex: 2,
              }}
            >
              {ownerName}
            </Typography>

            {/* Right: Action Buttons */}
            <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', zIndex: 2 }}>
              {onEdit && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(course);
                  }}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: '#FFFFFF',
                    color: '#0284C7',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    '&:hover': { bgcolor: '#E0F2FE', color: '#0369A1' },
                  }}
                >
                  <EditRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              )}
              {onDelete && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(course._id);
                  }}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: '#FFFFFF',
                    color: '#EF4444',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    '&:hover': { bgcolor: '#FEE2E2', color: '#DC2626' },
                  }}
                >
                  <DeleteRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              )}
              {onDownload && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(course);
                  }}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: '#FFFFFF',
                    color: '#0284C7',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    '&:hover': { bgcolor: '#E0F2FE', color: '#0369A1' },
                  }}
                >
                  <DownloadRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Box>
          </FooterRibbon>
        </Tooltip>
      </CardContent>
    </StyledCourseCard>
  );
};
