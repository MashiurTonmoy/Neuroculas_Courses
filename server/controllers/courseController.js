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
// Public / Optional Auth — browse approved courses
// ----------------------------------------------------------
exports.getCourses = async (req, res, next) => {
  try {
    const { q, lang, price, sort, page = 1, limit = 12 } = req.query

    // Start with approved courses
    let query = { status: 'approved' }

    // Visibility filtering
    if (!req.user || req.user.role !== 'admin') {
      if (req.user) {
        query.$or = [
          { visibility: { $ne: 'private' } },
          { owner: req.user._id }
        ]
      } else {
        query.visibility = { $ne: 'private' }
      }
    }

    // Full-text search
    if (q) query.$text = { $search: q }

    // Language filter
    if (lang) query.language = lang

    // Price filter
    if (price === 'free') query.price = 0
    if (price === 'paid') query.price = { $gt: 0 }

    // Count total matching docs
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
// Public / Optional Auth — get single course by ID
// ----------------------------------------------------------
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('owner', 'name avatar email')

    if (!course) {
      const err = new Error('Course not found')
      err.statusCode = 404
      return next(err)
    }

    // Check private visibility
    if (course.visibility === 'private') {
      const ownerId = course.owner ? (course.owner._id ? course.owner._id.toString() : course.owner.toString()) : ''
      const userId = req.user ? req.user._id.toString() : ''
      const isOwner = userId && ownerId === userId
      const isAdmin = req.user && req.user.role === 'admin'

      if (!isOwner && !isAdmin) {
        const err = new Error('This material is private')
        err.statusCode = 403
        return next(err)
      }
    }

    res.json(course)
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// POST /api/courses
// Protected — logged-in user uploads a course file
// ----------------------------------------------------------
exports.createCourse = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('Please upload a file')
      err.statusCode = 400
      return next(err)
    }

    const { title, description, price, language, tags, visibility } = req.body

    if (!title || !description) {
      const err = new Error('Title and description are required')
      err.statusCode = 400
      return next(err)
    }

    // Upload file buffer to Cloudinary
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
        : typeof tags === 'string'
          ? tags.split(',').map((t) => t.trim()).filter(Boolean)
          : []
    }

    // Create Course document
    const course = await Course.create({
      title,
      description,
      owner: req.user._id,
      fileUrl: uploadResult.secure_url,
      price: Number(price) || 0,
      language: language || 'English',
      tags: parsedTags,
      visibility: visibility === 'private' ? 'private' : 'public',
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
// PUT /api/courses/:id
// Protected — owner or admin can update all course fields & file
// ----------------------------------------------------------
exports.updateCourse = async (req, res, next) => {
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
      const err = new Error('Not authorized to edit this course')
      err.statusCode = 403
      return next(err)
    }

    const { title, description, price, language, tags, visibility } = req.body

    // Handle document file replacement if uploaded
    if (req.file) {
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
      course.fileUrl = uploadResult.secure_url
    }

    if (title !== undefined) course.title = title
    if (description !== undefined) course.description = description
    if (price !== undefined) course.price = Number(price) || 0
    if (language !== undefined) course.language = language
    if (visibility !== undefined) course.visibility = visibility === 'private' ? 'private' : 'public'

    if (tags !== undefined) {
      course.tags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
          ? tags.split(',').map((t) => t.trim()).filter(Boolean)
          : course.tags
    }

    await course.save()

    const updatedCourse = await Course.findById(course._id).populate('owner', 'name avatar email')
    res.json({ message: 'Course updated successfully', course: updatedCourse })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/courses/:id/download
// Protected + checkAccess — return Cloudinary file URL
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
// Protected — course owner or admin can delete
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
// Protected — get courses logged-in user has purchased/enrolled
// ----------------------------------------------------------
exports.getMyPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ buyer: req.user._id })
      .populate({
        path: 'course',
        populate: { path: 'owner', select: 'name avatar' }
      })
      .sort({ createdAt: -1 })

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
// Protected — get courses uploaded by logged-in user
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
// Protected — enroll in a free course
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

    const existing = await Purchase.findOne({
      buyer: req.user._id,
      course: course._id,
    })
    if (existing) {
      return res.json({ message: 'Already enrolled', alreadyEnrolled: true })
    }

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