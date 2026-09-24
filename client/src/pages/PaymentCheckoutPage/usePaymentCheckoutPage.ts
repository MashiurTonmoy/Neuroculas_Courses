import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/course';

export const usePaymentCheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await courseService.getCourse(id);
        setCourse(data);
      } catch (err) {
        console.error('Failed to load course for checkout', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !course) return;

    try {
      setProcessing(true);
      if (course.price === 0) {
        await courseService.enrollFree(id);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/library');
      }, 2000);
    } catch (err) {
      console.error('Payment checkout failed', err);
    } finally {
      setProcessing(false);
    }
  };

  return {
    course,
    loading,
    processing,
    success,
    handleCheckoutSubmit,
    navigate,
  };
};
