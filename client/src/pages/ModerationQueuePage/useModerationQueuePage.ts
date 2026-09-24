import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Course } from '../../types/course';

export const useModerationQueuePage = () => {
  const [pendingCourses, setPendingCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPending();
      setPendingCourses(data.courses);
    } catch (err) {
      console.error('Failed to load pending moderation courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await adminService.approveCourse(id);
      fetchPending();
    } catch (err) {
      console.error('Approval failed', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminService.rejectCourse(id);
      fetchPending();
    } catch (err) {
      console.error('Rejection failed', err);
    }
  };

  return {
    pendingCourses,
    loading,
    handleApprove,
    handleReject,
  };
};
