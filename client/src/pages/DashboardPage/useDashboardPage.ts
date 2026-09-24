import { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';
import { useAuth } from '../../context/AuthContext';

export const useDashboardPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [myPurchases, setMyPurchases] = useState<Course[]>([]);
  const [myUploads, setMyUploads] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [purchasesData, uploadsData] = await Promise.all([
        courseService.getMyPurchases(),
        courseService.getMyUploads(),
      ]);
      setMyPurchases(purchasesData);
      setMyUploads(uploadsData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    try {
      await courseService.deleteCourse(id);
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to delete course', err);
    }
  };

  return {
    user,
    tab,
    setTab,
    myPurchases,
    myUploads,
    loading,
    uploadModalOpen,
    setUploadModalOpen,
    handleDeleteCourse,
    fetchDashboardData,
  };
};
