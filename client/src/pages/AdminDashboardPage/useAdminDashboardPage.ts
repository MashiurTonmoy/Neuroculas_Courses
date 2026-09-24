import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { AdminStats } from '../../types/purchase';

export const useAdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  return {
    stats,
    loading,
  };
};
