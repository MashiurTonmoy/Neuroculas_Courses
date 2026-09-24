import { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';
import { triggerFileDownload } from '../../utils/downloadHelper';

export const useMyLibraryPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const data = await courseService.getMyPurchases();
      setCourses(data);
    } catch (err) {
      console.error('Failed to load library files', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleDownload = async (courseId: string, title?: string) => {
    try {
      const res = await courseService.downloadCourse(courseId);
      if (res.fileUrl) {
        await triggerFileDownload(res.fileUrl, title || 'document');
      }
    } catch (err) {
      console.error('Download error', err);
    }
  };

  return {
    courses,
    loading,
    handleDownload,
  };
};
