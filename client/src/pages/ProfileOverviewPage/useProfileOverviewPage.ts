import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';
import { User } from '../../types/user';

export const useProfileOverviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | Partial<User> | null>(null);
  const [uploads, setUploads] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const currentUserId = currentUser?.id || currentUser?._id;

        // Case 1: Viewing own profile or no ID specified
        if (!id || id === currentUserId) {
          setProfileUser(currentUser);
          const data = await courseService.getMyUploads();
          setUploads(data);
        } else {
          // Case 2: Viewing another user's profile
          const res = await courseService.getCourses({ limit: 100 });
          const userCourses = res.courses.filter((c) => {
            if (typeof c.owner === 'object' && c.owner !== null) {
              return c.owner._id === id || c.owner.id === id;
            }
            return c.owner === id;
          });

          setUploads(userCourses);

          if (userCourses.length > 0 && typeof userCourses[0].owner === 'object') {
            setProfileUser(userCourses[0].owner as User);
          } else {
            setProfileUser({ name: 'Creator Profile', _id: id });
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile statistics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [id, currentUser]);

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
    isSelf: !id || id === (currentUser?.id || currentUser?._id),
    handleDeleteCourse,
  };
};
