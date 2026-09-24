import React from 'react';
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { useNavbar } from './useNavbar';
import { StyledAppBar, LogoBox, LogoBadge, NavButton, PrimaryCTA } from './Navbar.styles';
import { colors } from '../../theme/theme';

export const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isAdmin,
    mobileOpen,
    anchorEl,
    isActive,
    handleDrawerToggle,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    navigate,
  } = useNavbar();

  const navLinks = [
    { label: 'Home', path: '/', icon: <HomeRoundedIcon sx={{ fontSize: 18 }} /> },
    { label: 'Explore', path: '/explore', icon: <ExploreRoundedIcon sx={{ fontSize: 18 }} /> },
    { label: 'Users', path: '/users', icon: <GroupRoundedIcon sx={{ fontSize: 18 }} /> },
    ...(isAuthenticated ? [{ label: 'My Library', path: '/library', icon: <LocalLibraryRoundedIcon sx={{ fontSize: 18 }} /> }] : []),
    ...(isAdmin ? [{ label: 'Admin', path: '/admin', icon: <AdminPanelSettingsRoundedIcon sx={{ fontSize: 18 }} /> }] : []),
  ];

  return (
    <StyledAppBar>
      <Toolbar disableGutters sx={{ px: { xs: 2, md: 4 }, justifyContent: 'space-between', minHeight: { xs: 60, md: 64 } }}>
        {/* Brand Logo */}
        <LogoBox onClick={() => navigate('/')}>
          <LogoBadge>
            <AutoStoriesRoundedIcon fontSize="small" />
          </LogoBadge>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: colors.textMain,
              letterSpacing: '-0.4px',
              fontSize: '1.05rem',
            }}
          >
            Neuroculas{' '}
            <span style={{ color: colors.primary }}>Courses</span>
          </Typography>
        </LogoBox>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {navLinks.map((link) => (
            <NavButton
              key={link.path}
              active={isActive(link.path) ? 1 : 0}
              onClick={() => navigate(link.path)}
              startIcon={link.icon}
            >
              {link.label}
            </NavButton>
          ))}
        </Box>

        {/* Action CTAs */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
          {isAuthenticated ? (
            <>
              <PrimaryCTA
                startIcon={<CloudUploadIcon />}
                onClick={() => navigate('/upload')}
                size="small"
              >
                Upload
              </PrimaryCTA>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    width: 36,
                    height: 36,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#FFF',
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    bgcolor: '#FFFFFF',
                    border: `1px solid ${colors.border}`,
                    borderRadius: 3,
                    mt: 1.5,
                    minWidth: 200,
                    boxShadow: '0 12px 40px rgba(96,165,250,0.15)',
                    '& .MuiMenuItem-root': { py: 1.2, px: 2, borderRadius: 2, mx: 0.5, my: 0.25 },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.textMain }}>
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: colors.border, mx: 1 }} />
                <MenuItem onClick={() => { handleMenuClose(); navigate(`/profile/${user?.id || user?._id}`); }}>
                  <AccountCircleOutlinedIcon fontSize="small" sx={{ mr: 1.5, color: colors.primary }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard'); }}>
                  <DashboardRoundedIcon fontSize="small" sx={{ mr: 1.5, color: colors.primary }} />
                  Dashboard
                </MenuItem>
                {isAdmin && (
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/admin/moderation'); }}>
                    <GavelRoundedIcon fontSize="small" sx={{ mr: 1.5, color: colors.warning }} />
                    Moderation Queue
                  </MenuItem>
                )}
                <Divider sx={{ borderColor: colors.border, mx: 1 }} />
                <MenuItem onClick={handleLogout} sx={{ color: `${colors.error} !important` }}>
                  <LogoutRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <NavButton onClick={() => navigate('/login')}>Sign In</NavButton>
              <PrimaryCTA onClick={() => navigate('/register')}>Get Started</PrimaryCTA>
            </>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'flex', md: 'none' }, color: colors.primary }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            bgcolor: '#F8FBFF',
            width: 280,
            p: 3,
            borderLeft: `1px solid ${colors.border}`,
            boxShadow: '-8px 0 40px rgba(96,165,250,0.12)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <LogoBadge sx={{ width: 30, height: 30, borderRadius: 8 }}>
            <AutoStoriesRoundedIcon sx={{ fontSize: 16 }} />
          </LogoBadge>
          <Typography variant="h6" sx={{ fontWeight: 800, color: colors.textMain, fontSize: '1rem' }}>
            Neuroculas <span style={{ color: colors.primary }}>Courses</span>
          </Typography>
        </Box>
        {isAuthenticated && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, p: 1.5, bgcolor: colors.veryLight, borderRadius: 3, border: `1px solid ${colors.border}` }}>
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                width: 38,
                height: 38,
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#FFF',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colors.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.textSecondary, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
        )}
        <Divider sx={{ borderColor: colors.border, mb: 2 }} />
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding sx={{ mb: 0.5 }}>
              <NavButton
                fullWidth
                active={isActive(link.path) ? 1 : 0}
                onClick={() => { handleDrawerToggle(); navigate(link.path); }}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
                startIcon={link.icon}
              >
                <ListItemText primary={link.label} />
              </NavButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: colors.border, my: 2 }} />
          {isAuthenticated ? (
            <>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <PrimaryCTA fullWidth startIcon={<CloudUploadIcon />} onClick={() => { handleDrawerToggle(); navigate('/upload'); }}>
                  Upload File
                </PrimaryCTA>
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <NavButton fullWidth onClick={() => { handleDrawerToggle(); navigate(`/profile/${user?.id || user?._id}`); }} startIcon={<AccountCircleOutlinedIcon sx={{ fontSize: 18 }} />}>
                  Profile
                </NavButton>
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <NavButton fullWidth onClick={() => { handleDrawerToggle(); navigate('/dashboard'); }} startIcon={<DashboardRoundedIcon sx={{ fontSize: 18 }} />}>
                  Dashboard
                </NavButton>
              </ListItem>
              {isAdmin && (
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <NavButton fullWidth onClick={() => { handleDrawerToggle(); navigate('/admin/moderation'); }} startIcon={<GavelRoundedIcon sx={{ fontSize: 18 }} />}>
                    Moderation Queue
                  </NavButton>
                </ListItem>
              )}
              <ListItem disablePadding>
                <NavButton fullWidth onClick={() => { handleDrawerToggle(); handleLogout(); }} sx={{ color: `${colors.error} !important` }} startIcon={<LogoutRoundedIcon sx={{ fontSize: 18 }} />}>
                  Logout
                </NavButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <NavButton fullWidth onClick={() => { handleDrawerToggle(); navigate('/login'); }}>
                  Sign In
                </NavButton>
              </ListItem>
              <ListItem disablePadding>
                <PrimaryCTA fullWidth onClick={() => { handleDrawerToggle(); navigate('/register'); }}>
                  Get Started
                </PrimaryCTA>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </StyledAppBar>
  );
};
