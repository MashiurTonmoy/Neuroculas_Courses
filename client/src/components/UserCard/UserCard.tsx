import React from 'react';
import { Paper, Box, Avatar, Typography, Chip } from '@mui/material';
import { UserWithStats } from '../../types/user';

interface UserCardProps {
  user: UserWithStats;
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        mb: 2,
        background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #38BDF8 100%)',
        borderRadius: 5,
        border: '1.5px solid #BAE6FD',
        boxShadow: '0 4px 16px rgba(56, 189, 248, 0.18)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(56, 189, 248, 0.28)',
          borderColor: '#38BDF8',
        },
      }}
    >
      {/* Decorative Background Waves */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 80"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <path d="M 400,80 C 550,20 650,60 800,0 L 800,80 Z" fill="rgba(56, 189, 248, 0.35)" />
        <path d="M 500,80 C 620,30 720,65 800,20 L 800,80 Z" fill="rgba(186, 230, 253, 0.55)" />
        <path d="M 600,80 Q 700,45 800,60 L 800,80 Z" fill="#34D399" opacity="0.5" />
      </svg>

      {/* Left: Avatar + Name + Admin Badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0, zIndex: 2 }}>
        <Avatar
          src={user.avatar}
          sx={{
            width: 46,
            height: 46,
            bgcolor: '#0B2545',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '1.1rem',
            border: '2.5px solid #38BDF8',
            boxShadow: '0 3px 10px rgba(11, 37, 69, 0.25)',
          }}
        >
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#0F172A',
                fontSize: '1.05rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.name}
            </Typography>
            {user.role === 'admin' && (
              <Chip
                label="Admin"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.68rem',
                  bgcolor: '#FFFFFF',
                  color: '#0284C7',
                  border: '1px solid #38BDF8',
                  fontWeight: 800,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Right: Upload Count Chip Styled like White Action Pill */}
      <Chip
        label={`${user.uploadCount || 0} file${(user.uploadCount || 0) !== 1 ? 's' : ''} uploaded`}
        sx={{
          bgcolor: '#FFFFFF',
          color: '#0F172A',
          fontWeight: 800,
          fontSize: '0.85rem',
          px: 1.5,
          height: 36,
          borderRadius: 99,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.10)',
          border: '1px solid #BAE6FD',
          zIndex: 2,
        }}
      />
    </Paper>
  );
};
