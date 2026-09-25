import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { userService } from '../../services/userService';
import { Course } from '../../types/course';
import { User, UserWithStats } from '../../types/user';

export const useProfileOverviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, updateUser } = useAuth();
  const [profileUser, setProfileUser] = useState<UserWithStats | User | null>(null);
  const [uploads, setUploads] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const currentUserId = currentUser?.id || currentUser?._id;
  const isSelf = !id || id === currentUserId;

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      const targetId = id || currentUserId;

      if (targetId) {
        try {
          const userDetails = await userService.getUserById(targetId);
          setProfileUser(userDetails);
        } catch {
          setProfileUser(currentUser);
        }
      } else {
        setProfileUser(currentUser);
      }

      if (isSelf) {
        const data = await courseService.getMyUploads();
        setUploads(data);
      } else if (targetId) {
        const res = await courseService.getCourses({ limit: 100 });
        const userCourses = res.courses.filter((c) => {
          if (typeof c.owner === 'object' && c.owner !== null) {
            return c.owner._id === targetId || c.owner.id === targetId;
          }
          return c.owner === targetId;
        });
        setUploads(userCourses);
      }
    } catch (err) {
      console.error('Failed to fetch profile statistics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id, currentUser]);

  const handleOpenEditModal = () => {
    const userToEdit = profileUser || currentUser;
    setEditName(userToEdit?.name || '');
    setEditAbout(userToEdit?.about || '');
    setEditError(null);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    if (!saving) {
      setEditModalOpen(false);
      setEditError(null);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);

    if (!editName.trim()) {
      setEditError('User name is required.');
      return;
    }

    try {
      setSaving(true);
      const res = await userService.updateProfile({
        name: editName.trim(),
        about: editAbout.trim(),
      });

      // Update AuthContext & localStorage
      updateUser(res.user);

      // Update local page profile state
      setProfileUser((prev) => ({
        ...prev,
        ...res.user,
      }));

      setEditModalOpen(false);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || 'Failed to update profile. Username may already be taken.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await courseService.deleteCourse(courseId);
      setUploads((prev) => prev.filter((c) => c._id !== courseId));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  return {
    currentUser,
    user: profileUser || currentUser,
    uploads,
    loading,
    isSelf,
    editModalOpen,
    editName,
    setEditName,
    editAbout,
    setEditAbout,
    saving,
    editError,
    handleOpenEditModal,
    handleCloseEditModal,
    handleSaveProfile,
    handleDeleteCourse,
    fetchProfileData,
  };
};
