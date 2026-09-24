import { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';

export const useProfileActivityPage = () => {
  const [uploads, setUploads] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const data = await courseService.getMyUploads();
        setUploads(data);
      } catch (err) {
        console.error('Failed to load activity feed', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  return {
    uploads,
    loading,
  };
};
