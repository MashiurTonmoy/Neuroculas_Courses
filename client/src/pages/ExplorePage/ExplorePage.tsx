import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  InputBase,
  MenuItem,
  Select,
  CircularProgress,
  Pagination,
  Chip,
  Button,
  Tabs,
  Tab,
  Paper,
  Avatar,
  ClickAwayListener,
  List,
  ListItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { useExplorePage } from './useExplorePage';
import { useUsersPage } from '../UsersPage/useUsersPage';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { EditCourseModal } from '../../components/EditCourseModal/EditCourseModal';
import { UserCard } from '../../components/UserCard/UserCard';
import { Course } from '../../types/course';
import { courseService } from '../../services/courseService';
import { FilterBarPaper, SearchInputBox } from './ExplorePage.styles';
import { colors } from '../../theme/theme';

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);

  // Search Autocomplete Suggestion Pool
  const [allSuggestionsPool, setAllSuggestionsPool] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    courses,
    loading,
    searchQuery,
    setSearchQuery,
    language,
    setLanguage,
    priceFilter,
    setPriceFilter,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    user,
    fetchCourses,
    handleDeleteCourse,
  } = useExplorePage();

  const {
    users,
    searchQuery: userSearchQuery,
    setSearchQuery: setUserSearchQuery,
    loading: usersLoading,
    page: userPage,
    setPage: setUserPage,
    totalPages: userTotalPages,
  } = useUsersPage();

  useEffect(() => {
    const loadSuggestionsPool = async () => {
      try {
        const res = await courseService.getCourses({ limit: 100 });
        const itemsSet = new Set<string>();
        res.courses.forEach((c) => {
          if (c.title) itemsSet.add(c.title);
          if (Array.isArray(c.tags)) {
            c.tags.forEach((t) => {
              if (t && t.trim()) itemsSet.add(t.trim());
            });
          }
        });
        setAllSuggestionsPool(Array.from(itemsSet));
      } catch (err) {
        console.error('Failed to load suggestion pool', err);
      }
    };
    loadSuggestionsPool();
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? allSuggestionsPool.filter((item) =>
        item.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ).slice(0, 8)
    : [];

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

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
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
                {activeTab === 0 ? (
                  <ExploreRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
                ) : (
                  <GroupRoundedIcon sx={{ color: '#FFF', fontSize: 22 }} />
                )}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain }}>
                {activeTab === 0 ? 'Explore Marketplace' : 'Users Directory'}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: colors.textSecondary, ml: 7 }}>
              {activeTab === 0
                ? 'Search and discover digital files, courses, and educational assets.'
                : 'Search community members and view their uploaded file counts.'}
            </Typography>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              bgcolor: colors.bgCard,
              borderRadius: 3,
              p: 0.5,
              border: `1px solid ${colors.border}`,
              '& .MuiTabs-indicator': {
                bgcolor: colors.primary,
                height: '100%',
                borderRadius: 2.5,
                zIndex: 0,
              },
            }}
          >
            <Tab
              icon={<ExploreRoundedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Files & Courses"
              sx={{
                fontWeight: 700,
                fontSize: '0.88rem',
                minHeight: 40,
                zIndex: 1,
                color: activeTab === 0 ? '#FFF !important' : colors.textSecondary,
              }}
            />
            <Tab
              icon={<GroupRoundedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Users Directory"
              sx={{
                fontWeight: 700,
                fontSize: '0.88rem',
                minHeight: 40,
                zIndex: 1,
                color: activeTab === 1 ? '#FFF !important' : colors.textSecondary,
              }}
            />
          </Tabs>
        </Box>

        {activeTab === 0 ? (
          <>
            {/* ── Filter Bar ──────────────────────────────────────────────── */}
            <FilterBarPaper elevation={0}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5}>
                  <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
                    <Box sx={{ position: 'relative' }}>
                      <SearchInputBox>
                        <SearchRoundedIcon sx={{ color: colors.primary, mr: 1, fontSize: 20 }} />
                        <InputBase
                          placeholder="Search files by title, tags or topic..."
                          fullWidth
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          sx={{ color: colors.textMain, fontSize: '0.9rem' }}
                        />
                      </SearchInputBox>

                      {showSuggestions && searchQuery.trim().length > 0 && filteredSuggestions.length > 0 && (
                        <Paper
                          elevation={6}
                          sx={{
                            position: 'absolute',
                            top: 'calc(100% + 6px)',
                            left: 0,
                            right: 0,
                            zIndex: 100,
                            bgcolor: '#FFFFFF',
                            border: `1px solid ${colors.border}`,
                            borderRadius: 3,
                            boxShadow: '0 12px 32px rgba(96,165,250,0.20)',
                            overflow: 'hidden',
                          }}
                        >
                          <List disablePadding>
                            {filteredSuggestions.map((item, idx) => (
                              <ListItem
                                key={idx}
                                component="div"
                                onClick={() => {
                                  setSearchQuery(item);
                                  setShowSuggestions(false);
                                }}
                                sx={{
                                  py: 1.25,
                                  px: 2,
                                  cursor: 'pointer',
                                  borderBottom: idx !== filteredSuggestions.length - 1 ? `1px solid ${colors.bgSoft}` : 'none',
                                  '&:hover': { bgcolor: colors.veryLight },
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5,
                                }}
                              >
                                <SearchRoundedIcon sx={{ fontSize: 18, color: colors.primary }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textMain }}>
                                  {item}
                                </Typography>
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      )}
                    </Box>
                  </ClickAwayListener>
                </Grid>

                <Grid item xs={6} sm={3} md={2.5}>
                  <Select
                    displayEmpty
                    fullWidth
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    size="small"
                    sx={{
                      bgcolor: colors.veryLight,
                      color: colors.textMain,
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
                      fontSize: '0.88rem',
                    }}
                  >
                    <MenuItem value="">All Languages</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Bangla">Bangla</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={6} sm={3} md={2.5}>
                  <Select
                    fullWidth
                    value={sort}
                    onChange={(e) => setSort(e.target.value as any)}
                    size="small"
                    sx={{
                      bgcolor: colors.veryLight,
                      color: colors.textMain,
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
                      fontSize: '0.88rem',
                    }}
                  >
                    <MenuItem value="latest">Newest First</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} md={2} sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label="Free Only"
                    onClick={() => setPriceFilter(priceFilter === 'free' ? '' : 'free')}
                    sx={{
                      bgcolor: priceFilter === 'free' ? colors.soft : colors.veryLight,
                      color: priceFilter === 'free' ? colors.primary : colors.textSecondary,
                      fontWeight: 700,
                      border: `1px solid ${priceFilter === 'free' ? colors.primary : colors.border}`,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: colors.soft, color: colors.primary },
                    }}
                  />
                </Grid>
              </Grid>
            </FilterBarPaper>

            {/* ── Results ─────────────────────────────────────────────────── */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
              </Box>
            ) : courses.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  bgcolor: colors.bgCard,
                  borderRadius: 4,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <FilterListRoundedIcon sx={{ fontSize: 48, color: colors.border, mb: 1.5 }} />
                <Typography variant="h6" sx={{ color: colors.textMain, mb: 1 }}>
                  No files match your search
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                  Try adjusting your search keywords or clearing filters.
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 2.5 }}>
                  Showing <strong>{courses.length}</strong> result{courses.length !== 1 ? 's' : ''}
                </Typography>
                <Grid container spacing={2.5}>
                  {courses.map((course) => {
                    const currentUserId = user?._id || user?.id;
                    const ownerId = typeof course.owner === 'object' && course.owner !== null ? (course.owner._id || course.owner.id) : course.owner;
                    const canManage = Boolean(user && (user.role === 'admin' || currentUserId === ownerId));
                    return (
                      <Grid item xs={12} sm={6} md={4} key={course._id}>
                        <CourseCard
                          course={course}
                          onEdit={canManage ? (c) => setEditingCourse(c) : undefined}
                          onDelete={canManage ? handleDeleteCourse : undefined}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, val) => setPage(val)}
                      shape="rounded"
                      sx={{
                        '& .MuiPaginationItem-root': { color: colors.textSecondary, borderColor: colors.border },
                        '& .Mui-selected': { bgcolor: `${colors.primary} !important`, color: '#FFF' },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* ── Users Search Bar ───────────────────────────────────────── */}
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                mb: 4,
                bgcolor: colors.bgCard,
                borderRadius: 3,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                boxShadow: '0 4px 16px rgba(96,165,250,0.06)',
              }}
            >
              <SearchRoundedIcon sx={{ color: colors.primary, ml: 1, fontSize: 22 }} />
              <InputBase
                placeholder="Search users by name..."
                fullWidth
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                sx={{ color: colors.textMain, fontSize: '0.95rem', fontWeight: 500 }}
              />
            </Paper>

            {/* ── Single Line Users List ───────────────────────────────────── */}
            {usersLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : users.length === 0 ? (
              <Box
                sx={{
                  p: 7,
                  bgcolor: colors.bgCard,
                  borderRadius: 4,
                  border: `1px solid ${colors.border}`,
                  textAlign: 'center',
                }}
              >
                <GroupRoundedIcon sx={{ fontSize: 52, color: colors.border, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.textMain, mb: 1 }}>
                  No users found
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                  Try searching with a different user name.
                </Typography>
              </Box>
            ) : (
              <Box>
                {users.map((u) => (
                  <UserCard
                    key={u._id || u.id}
                    user={u}
                    onClick={() => navigate(`/profile/${u._id || u.id}`)}
                  />
                ))}

                {userTotalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                    <Pagination
                      count={userTotalPages}
                      page={userPage}
                      onChange={(_, val) => setUserPage(val)}
                      size="small"
                      shape="rounded"
                      sx={{
                        '& .MuiPaginationItem-root': { color: colors.textSecondary, borderColor: colors.border },
                        '& .Mui-selected': { bgcolor: `${colors.primary} !important`, color: '#FFF', fontWeight: 800 },
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
        <EditCourseModal
          open={Boolean(editingCourse)}
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSuccess={() => fetchCourses()}
        />
      </Container>
    </Box>
  );
};
