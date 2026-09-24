// controllers/reviewController.js
const Review  = require('../models/Review')
const Course  = require('../models/Course')
const Purchase = require('../models/Purchase')

// ----------------------------------------------------------
// POST /api/courses/:id/reviews
// Protected — user must have purchased the course to review it
// ----------------------------------------------------------
exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body
    const courseId = req.params.id

    // 1. Course must exist and be approved
    const course = await Course.findById(courseId)
    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }
    if (course.status !== 'approved') {
      const err = new Error('You can only review approved courses')
      err.statusCode = 400
      return next(err)
    }

    // 2. For paid courses — user must have purchased it
    if (course.price > 0) {
      const purchase = await Purchase.findOne({
        buyer: req.user._id,
        course: courseId,
      })
      if (!purchase) {
        const err = new Error('You must purchase this course before reviewing it')
        err.statusCode = 403
        return next(err)
      }
    }

    // 3. Validate rating
    if (!rating || rating < 1 || rating > 5) {
      const err = new Error('Rating must be between 1 and 5')
      err.statusCode = 400
      return next(err)
    }

    // 4. Create the review
    // The unique index { course, reviewer } on the Review schema will throw
    // an error if the user already reviewed this course — caught in catch block
    const review = await Review.create({
      course: courseId,
      reviewer: req.user._id,
      rating: Number(rating),
      comment: comment || '',
    })

    // The Review post-save hook automatically updates course.avgRating
    // (see models/Review.js)

    await review.populate('reviewer', 'name avatar')

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
    })
  } catch (err) {
    // Duplicate key error = user already reviewed this course
    if (err.code === 11000) {
      const dupErr = new Error('You have already reviewed this course')
      dupErr.statusCode = 400
      return next(dupErr)
    }
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/courses/:id/reviews
// Public — get all reviews for a course
// ----------------------------------------------------------
exports.getReviews = async (req, res, next) => {
  try {
    const courseId = req.params.id

    const course = await Course.findById(courseId)
    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    const reviews = await Review.find({ course: courseId })
      .populate('reviewer', 'name avatar')
      .sort({ createdAt: -1 })   // newest first

    res.json({
      totalReviews: reviews.length,
      avgRating: course.avgRating,
      reviews,
    })
  } catch (err) {
    next(err)
  }
}