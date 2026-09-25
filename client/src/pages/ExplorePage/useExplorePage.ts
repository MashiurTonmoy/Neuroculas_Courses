import { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';
import { useAuth } from '../../context/AuthContext';

export const useExplorePage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [priceFilter, setPriceFilter] = useState<'free' | 'paid' | ''>('');
  const [sort, setSort] = useState<'latest' | 'rating'>('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await courseService.getCourses({
        q: searchQuery || undefined,
        lang: language || undefined,
        price: priceFilter || undefined,
        sort,
        page,
        limit: 12,
      });
      setCourses(res.courses);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to load marketplace courses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await courseService.deleteCourse(id);
      fetchCourses();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete file');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchQuery, language, priceFilter, sort, page]);

  return {
    courses,
    loading,
    searchQuery,
    setSearchQuery,
    language,
    setLanguage,
    priceFilter,
    setPriceFilter,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    user,
    fetchCourses,
    handleDeleteCourse,
  };
};
