// controllers/courseController.js
const Course   = require('../models/Course')
const Purchase = require('../models/Purchase')
const cloudinary = require('cloudinary').v2

const path = require('path')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ----------------------------------------------------------
// GET /api/courses?q=react&lang=english&price=free&sort=rating&page=1&limit=12
// Public — browse and search approved courses (with pagination)
// ----------------------------------------------------------
exports.getCourses = async (req, res, next) => {
  try {
    const { q, lang, price, sort, page = 1, limit = 12 } = req.query

    // Start with only approved courses
    let query = { status: 'approved' }

    // Full-text search
    if (q) query.$text = { $search: q }

    // Language filter
    if (lang) query.language = lang

    // Price filter
    if (price === 'free') query.price = 0
    if (price === 'paid') query.price = { $gt: 0 }

    // Count total matching docs (for pagination metadata)
    const total = await Course.countDocuments(query)

    // Build the DB query with pagination
    const pageNum  = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)))
    const skip     = (pageNum - 1) * limitNum

    let dbQuery = Course.find(query)
      .populate('owner', 'name avatar')
      .skip(skip)
      .limit(limitNum)

    // Sorting
    if (sort === 'rating') dbQuery = dbQuery.sort({ avgRating: -1 })
    else dbQuery = dbQuery.sort({ createdAt: -1 })

    const courses = await dbQuery

    res.json({
      courses,
      page:       pageNum,
      limit:      limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/courses/:id
// Public — get a single course by ID
// ----------------------------------------------------------
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('owner', 'name avatar email')

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    res.json(course)
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// POST /api/courses
// Protected — logged-in user uploads a course PDF
// ----------------------------------------------------------
exports.createCourse = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('Please upload a PDF file')
      err.statusCode = 400
      return next(err)
    }

    const { title, description, price, language, tags } = req.body

    if (!title || !description) {
      const err = new Error('Title and description are required')
      err.statusCode = 400
      return next(err)
    }

    // Upload file buffer to Cloudinary as a raw file (PDF, DOCX, PPTX, ZIP, etc.)
    const ext = path.extname(req.file.originalname) || '.pdf'
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'course_marketplace',
          public_id: `course_${Date.now()}${ext}`,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(req.file.buffer)
    })

    // Parse tags
    let parsedTags = []
    if (tags) {
      parsedTags = Array.isArray(tags)
        ? tags
        : tags.split(',').map((t) => t.trim()).filter(Boolean)
    }

    // Create Course document (Auto-approved on upload)
    const course = await Course.create({
      title,
      description,
      owner: req.user._id,
      fileUrl: uploadResult.secure_url,
      price: Number(price) || 0,
      language: language || 'English',
      tags: parsedTags,
      status: 'approved',
    })

    res.status(201).json({
      message: 'Course uploaded and published successfully.',
      course,
    })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/courses/:id/download
// Protected + checkAccess — return the Cloudinary PDF URL
// ----------------------------------------------------------
exports.downloadCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    res.json({ fileUrl: course.fileUrl })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// DELETE /api/courses/:id
// Protected — only the course owner (or admin) can delete
// ----------------------------------------------------------
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    const isOwner = course.owner.toString() === req.user._id.toString()
    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      const err = new Error('Not authorized to delete this course')
      err.statusCode = 403
      return next(err)
    }

    await course.deleteOne()
    res.json({ message: 'Course deleted successfully' })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/courses/my-purchases
// Protected — get all courses the logged-in user has purchased/enrolled
// ----------------------------------------------------------
exports.getMyPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ buyer: req.user._id })
      .populate({
        path: 'course',
        populate: { path: 'owner', select: 'name avatar' }
      })
      .sort({ createdAt: -1 })

    // Filter out any purchases where the course was deleted
    const courses = purchases
      .filter(p => p.course != null)
      .map(p => ({
        ...p.course.toObject(),
        purchasedAt: p.createdAt,
        purchaseStatus: p.status,
      }))

    res.json(courses)
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/courses/my-uploads
// Protected — get all courses uploaded by the logged-in user
// ----------------------------------------------------------
exports.getMyUploads = async (req, res, next) => {
  try {
    const courses = await Course.find({ owner: req.user._id })
      .sort({ createdAt: -1 })

    res.json(courses)
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// POST /api/courses/:id/enroll-free
// Protected — enroll in a free course (creates Purchase record)
// ----------------------------------------------------------
exports.enrollFree = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    if (course.price > 0) {
      const err = new Error('This course is not free. Please purchase it.')
      err.statusCode = 400
      return next(err)
    }

    if (course.status !== 'approved') {
      const err = new Error('Course is not available yet')
      err.statusCode = 400
      return next(err)
    }

    // Check if already enrolled
    const existing = await Purchase.findOne({
      buyer: req.user._id,
      course: course._id,
    })
    if (existing) {
      return res.json({ message: 'Already enrolled', alreadyEnrolled: true })
    }

    // Create free enrollment record
    await Purchase.create({
      buyer:  req.user._id,
      course: course._id,
      amount: 0,
      status: 'free',
    })

    res.status(201).json({ message: 'Enrolled successfully', courseId: course._id })
  } catch (err) {
    next(err)
  }
}