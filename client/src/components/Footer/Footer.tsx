import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { FooterContainer } from './Footer.styles';
import { colors } from '../../theme/theme';

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            textAlign: { xs: 'center', md: 'left' },
            gap: { xs: 2, md: 0 },
          }}
        >
          {/* Line 1 (Mobile) / Left (Desktop): Logo & Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                width: 32,
                height: 32,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                boxShadow: '0 4px 10px rgba(96,165,250,0.25)',
              }}
            >
              <AutoStoriesRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: colors.textMain, fontSize: '1.05rem', letterSpacing: '-0.3px' }}
            >
              Neuroculas <span style={{ color: colors.primary }}>Courses</span>
            </Typography>
          </Box>

          {/* Line 2 (Mobile) / Center (Desktop): Website Link */}
          <Link
            href="https://neuroculas.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: colors.primaryDark,
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              px: 2,
              py: 0.5,
              borderRadius: 99,
              bgcolor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: colors.veryLight,
                borderColor: colors.primary,
                transform: 'translateY(-1px)',
              },
            }}
          >
            <LanguageRoundedIcon sx={{ fontSize: 16 }} />
            Visit Neuroculas Website
          </Link>

          {/* Line 3 (Mobile) / Right (Desktop): Created by line */}
          <Typography variant="body2" sx={{ color: colors.textSecondary, fontWeight: 600, fontSize: '0.88rem' }}>
            Created by <strong>Neuroculas</strong>
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};
