import { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';
import { useAuth } from '../../context/AuthContext';

export const useHomeFeedPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourses({ limit: 6, sort: 'rating' });
      setCourses(data.courses);
    } catch (err) {
      console.error('Failed to fetch trending courses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await courseService.deleteCourse(id);
      fetchTrendingCourses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete file');
    }
  };

  useEffect(() => {
    fetchTrendingCourses();
  }, []);

  return {
    courses,
    loading,
    user,
    handleDeleteCourse,
  };
};
