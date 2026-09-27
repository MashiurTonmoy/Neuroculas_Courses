import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { UserWithStats } from '../../types/user';

export const useUsersPage = () => {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (query: string, pageNum: number) => {
    try {
      setLoading(true);
      const res = await userService.getUsers({ q: query, page: pageNum, limit: 10 });
      setUsers(res.users || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchQuery, page);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, page]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return {
    users,
    searchQuery,
    setSearchQuery: handleSearchChange,
    loading,
    page,
    setPage,
    totalPages,
  };
};
