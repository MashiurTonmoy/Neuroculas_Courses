import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@mui/material';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

import { useNavbar } from '../Navbar/useNavbar';
import {
  DesktopSidebarContainer,
  MobileBottomNavContainer,
  NavItemBox,
  SidebarLogoBadge,
} from './Sidebar.styles';
import { colors } from '../../theme/theme';

export const Sidebar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isAdmin,
    anchorEl,
    isActive,
    handleMenuOpen,
    handleMenuClose,
    handleLogout,
    navigate,
  } = useNavbar();

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeRoundedIcon sx={{ fontSize: 22 }} /> },
    { label: 'Explore', path: '/explore', icon: <ExploreRoundedIcon sx={{ fontSize: 22 }} /> },
    { label: 'Users', path: '/users', icon: <GroupRoundedIcon sx={{ fontSize: 22 }} /> },
    ...(isAuthenticated
      ? [{ label: 'Library', path: '/library', icon: <LocalLibraryRoundedIcon sx={{ fontSize: 22 }} /> }]
      : []),
    { label: 'Upload', path: '/upload', icon: <CloudUploadIcon sx={{ fontSize: 22 }} /> },
    ...(isAdmin
      ? [{ label: 'Admin', path: '/admin', icon: <AdminPanelSettingsRoundedIcon sx={{ fontSize: 22 }} /> }]
      : []),
    ...(!isAuthenticated
      ? [{ label: 'Register', path: '/register', icon: <PersonAddRoundedIcon sx={{ fontSize: 22 }} /> }]
      : []),
  ];

  return (
    <>
      {/* ══ DESKTOP FIXED SIDEBAR (Far-left edge, fixed 100vh) ══════════════ */}
      <DesktopSidebarContainer>
        {/* Top: Brand Logo */}
        <Tooltip title="Neuroculas Courses" placement="right">
          <SidebarLogoBadge onClick={() => navigate('/')}>
            <AutoStoriesRoundedIcon sx={{ fontSize: 24 }} />
          </SidebarLogoBadge>
        </Tooltip>

        {/* Center: Navigation Stack */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.25,
            width: '100%',
            my: 'auto',
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Tooltip key={item.path} title={item.label} placement="right">
                <NavItemBox
                  active={active ? 1 : 0}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.66rem',
                      fontWeight: active ? 800 : 600,
                      lineHeight: 1.1,
                      mt: 0.3,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Typography>
                </NavItemBox>
              </Tooltip>
            );
          })}
        </Box>

        {/* Bottom: Profile Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isAuthenticated ? (
            <Tooltip title={user?.name || 'Profile'} placement="right">
              <NavItemBox onClick={handleMenuOpen} active={anchorEl ? 1 : 0}>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    width: 28,
                    height: 28,
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#FFF',
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    mt: 0.3,
                    maxWidth: 54,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user?.name ? user.name.split(' ')[0] : 'Profile'}
                </Typography>
              </NavItemBox>
            </Tooltip>
          ) : (
            <Tooltip title="Sign In" placement="right">
              <NavItemBox onClick={() => navigate('/login')}>
                <LoginRoundedIcon sx={{ fontSize: 22 }} />
                <Typography variant="caption" sx={{ fontSize: '0.66rem', fontWeight: 700, mt: 0.3 }}>
                  Sign In
                </Typography>
              </NavItemBox>
            </Tooltip>
          )}
        </Box>
      </DesktopSidebarContainer>

      {/* ══ MOBILE BOTTOM NAVIGATION BAR (Fixed bottom for mobile screens) ══ */}
      <MobileBottomNavContainer>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <NavItemBox
              key={item.path}
              active={active ? 1 : 0}
              onClick={() => navigate(item.path)}
              sx={{ width: '50px', height: '52px', minWidth: '44px', flexShrink: 0 }}
            >
              {item.icon}
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.62rem',
                  fontWeight: active ? 800 : 600,
                  mt: 0.2,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Typography>
            </NavItemBox>
          );
        })}

        {/* Profile on mobile */}
        {isAuthenticated ? (
          <NavItemBox
            onClick={handleMenuOpen}
            active={Boolean(anchorEl) ? 1 : 0}
            sx={{ width: '50px', height: '52px', minWidth: '44px', flexShrink: 0 }}
          >
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                width: 26,
                height: 26,
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#FFF',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            <Typography variant="caption" sx={{ fontSize: '0.62rem', fontWeight: 700, mt: 0.2 }}>
              {user?.name ? user.name.split(' ')[0] : 'Profile'}
            </Typography>
          </NavItemBox>
        ) : (
          <NavItemBox
            onClick={() => navigate('/login')}
            sx={{ width: '50px', height: '52px', minWidth: '44px', flexShrink: 0 }}
          >
            <LoginRoundedIcon sx={{ fontSize: 20 }} />
            <Typography variant="caption" sx={{ fontSize: '0.62rem', fontWeight: 700, mt: 0.2 }}>
              Sign In
            </Typography>
          </NavItemBox>
        )}
      </MobileBottomNavContainer>

      {/* ══ SHARED PROFILE POPUP MENU ═════════════════════════════════════ */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: '#FFFFFF',
            border: `1px solid ${colors.border}`,
            borderRadius: 3,
            mt: 1,
            minWidth: 210,
            boxShadow: '0 12px 40px rgba(96,165,250,0.18)',
            '& .MuiMenuItem-root': { py: 1.2, px: 2, borderRadius: 2, mx: 0.5, my: 0.25 },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated && user && (
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: colors.textMain }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSecondary, display: 'block' }}>
              {user?.email}
            </Typography>
          </Box>
        )}
        <Divider sx={{ borderColor: colors.border, mx: 1 }} />
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(`/profile/${user?.id || user?._id}`);
          }}
        >
          <AccountCircleOutlinedIcon fontSize="small" sx={{ mr: 1.5, color: colors.primary }} />
          Profile Overview
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate('/dashboard');
          }}
        >
          <DashboardRoundedIcon fontSize="small" sx={{ mr: 1.5, color: colors.primary }} />
          Dashboard
        </MenuItem>
        {isAdmin && (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate('/admin/moderation');
            }}
          >
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
  );
};
