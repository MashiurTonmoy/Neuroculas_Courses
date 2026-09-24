import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { UserWithStats } from '../../types/user';

export const useUsersPage = () => {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (query: string) => {
    try {
      setLoading(true);
      const data = await userService.getUsers(query);
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return {
    users,
    searchQuery,
    setSearchQuery,
    loading,
  };
};
