// controllers/adminController.js
const Course   = require('../models/Course')
const User     = require('../models/User')
const Purchase = require('../models/Purchase')
const Review   = require('../models/Review')

// ----------------------------------------------------------
// GET /api/admin/pending
// Admin only — list all courses waiting for approval
// ----------------------------------------------------------
exports.getPending = async (req, res, next) => {
  try {
    const pendingCourses = await Course.find({ status: 'pending' })
      .populate('owner', 'name email avatar')
      .sort({ createdAt: -1 })

    res.json({
      total: pendingCourses.length,
      courses: pendingCourses,
    })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// PATCH /api/admin/approve/:id
// Admin only — approve a pending course (makes it publicly visible)
// ----------------------------------------------------------
exports.approveCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    if (course.status === 'approved') {
      return res.status(400).json({ message: 'Course is already approved' })
    }

    course.status = 'approved'
    await course.save()

    res.json({ message: 'Course approved successfully', course })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// PATCH /api/admin/reject/:id
// Admin only — reject a course (removes it from pending, hides it)
// Optionally send a rejection reason in req.body.reason
// ----------------------------------------------------------
exports.rejectCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    if (course.status === 'rejected') {
      return res.status(400).json({ message: 'Course is already rejected' })
    }

    course.status = 'rejected'
    await course.save()

    res.json({ message: 'Course rejected', course })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/admin/stats
// Admin only — dashboard statistics
// ----------------------------------------------------------
exports.getStats = async (req, res, next) => {
  try {
    // Run all DB counts in parallel for speed
    const [
      totalUsers,
      totalCourses,
      pendingCourses,
      approvedCourses,
      rejectedCourses,
      totalPurchases,
      totalReviews,
      revenueResult,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Course.countDocuments({ status: 'pending' }),
      Course.countDocuments({ status: 'approved' }),
      Course.countDocuments({ status: 'rejected' }),
      Purchase.countDocuments(),
      Review.countDocuments(),
      // Sum all purchase amounts to get total revenue
      Purchase.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ])

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

    // Most recent 5 purchases
    const recentPurchases = await Purchase.find()
      .populate('buyer', 'name email')
      .populate('course', 'title price')
      .sort({ createdAt: -1 })
      .limit(5)

    res.json({
      users: totalUsers,
      courses: {
        total: totalCourses,
        pending: pendingCourses,
        approved: approvedCourses,
        rejected: rejectedCourses,
      },
      purchases: totalPurchases,
      reviews: totalReviews,
      totalRevenue,        // total BDT earned
      recentPurchases,
    })
  } catch (err) {
    next(err)
  }
}