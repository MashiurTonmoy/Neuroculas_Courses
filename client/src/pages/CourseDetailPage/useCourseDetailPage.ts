import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { reviewService } from '../../services/reviewService';
import { Course } from '../../types/course';
import { Review } from '../../types/review';
import { useAuth } from '../../context/AuthContext';

import { triggerFileDownload } from '../../utils/downloadHelper';

export const useCourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteCourse = async () => {
    if (!id || !course) return;
    if (!window.confirm(`Are you sure you want to delete "${course.title}"?`)) return;
    try {
      setDeleting(true);
      await courseService.deleteCourse(id);
      navigate('/explore');
    } catch (err: any) {
      console.error('Failed to delete course', err);
      alert(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setDeleting(false);
    }
  };

  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Review Form state
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  const fetchCourseDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await courseService.getCourse(id);
      setCourse(data);

      const reviewData = await reviewService.getReviews(id);
      setReviews(reviewData.reviews);
    } catch (err) {
      console.error('Failed to load course details', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const handleEnrollOrDownload = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!course) return;

    try {
      setDownloading(true);
      // Free course enrollment flow
      if (course.price === 0) {
        await courseService.enrollFree(course._id);
        setEnrolled(true);
        // Trigger download
        const res = await courseService.downloadCourse(course._id);
        if (res.fileUrl) {
          await triggerFileDownload(res.fileUrl, course.title);
        }
      } else {
        // Paid checkout flow
        navigate(`/checkout/${course._id}`);
      }
    } catch (err: any) {
      console.error('Download/Enroll error', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !rating) return;
    try {
      setReviewSubmitting(true);
      setReviewError(null);
      setReviewSuccess(null);
      await reviewService.createReview(id, { rating, comment });
      setReviewSuccess('Review submitted successfully!');
      setComment('');
      fetchCourseDetails();
    } catch (err: any) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return {
    course,
    reviews,
    loading,
    downloading,
    enrolled,
    rating,
    setRating,
    comment,
    setComment,
    reviewSubmitting,
    reviewError,
    reviewSuccess,
    handleEnrollOrDownload,
    handleReviewSubmit,
    handleDeleteCourse,
    deleting,
    fetchCourseDetails,
    isAuthenticated,
    user,
  };
};
