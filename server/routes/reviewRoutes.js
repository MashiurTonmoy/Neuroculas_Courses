// routes/reviewRoutes.js
const router  = require('express').Router()
const protect = require('../middleware/protect')
const { createReview, getReviews } = require('../controllers/reviewController')

// NOTE: These routes are mounted at /api/courses in server.js
// so the full paths become:
//   POST  /api/courses/:id/reviews  → submit a review
//   GET   /api/courses/:id/reviews  → get all reviews for a course

// GET   /api/courses/:id/reviews  — public
router.get('/:id/reviews', getReviews)

// POST  /api/courses/:id/reviews  — must be logged in
router.post('/:id/reviews', protect, createReview)

module.exports = router