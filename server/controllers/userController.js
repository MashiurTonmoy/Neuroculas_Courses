const User   = require('../models/User')
const Course = require('../models/Course')

// ----------------------------------------------------------
// GET /api/users?q=name
// Public — search users by name and include upload counts
// ----------------------------------------------------------
exports.getUsers = async (req, res, next) => {
  try {
    const { q, search, page, limit } = req.query
    const searchTerm = (q || search || '').trim()

    let filter = {}
    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: 'i' }
    }

    const totalUsers = await User.countDocuments(filter)

    let query = User.find(filter).select('-password').sort({ createdAt: -1 })

    let pageNum = 1
    let limitNum = 10
    let totalPages = 1

    if (page || limit) {
      pageNum = Math.max(1, parseInt(page, 10) || 1)
      limitNum = Math.max(1, parseInt(limit, 10) || 10)
      totalPages = Math.ceil(totalUsers / limitNum) || 1
      const skip = (pageNum - 1) * limitNum
      query = query.skip(skip).limit(limitNum)
    }

    const users = await query

    // Calculate file upload count for each user
    const userIds = users.map(u => u._id)
    const counts = await Course.aggregate([
      { $match: { owner: { $in: userIds } } },
      { $group: { _id: '$owner', count: { $sum: 1 } } }
    ])

    const countMap = {}
    counts.forEach(c => {
      countMap[c._id.toString()] = c.count
    })

    const result = users.map(user => ({
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || '',
      about: user.about || '',
      createdAt: user.createdAt,
      uploadCount: countMap[user._id.toString()] || 0
    }))

    if (page || limit) {
      return res.json({
        users: result,
        totalUsers,
        totalPages,
        page: pageNum,
      })
    }

    res.json(result)
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// GET /api/users/:id
// Public — fetch single user profile details with upload count
// ----------------------------------------------------------
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const uploadCount = await Course.countDocuments({ owner: user._id })

    res.json({
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || '',
      about: user.about || '',
      createdAt: user.createdAt,
      uploadCount,
    })
  } catch (err) {
    next(err)
  }
}

// ----------------------------------------------------------
// PUT /api/users/profile
// Private — update user profile (user name & about bio)
// ----------------------------------------------------------
exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { name, about } = req.body

    if (name !== undefined) {
      const trimmedName = name.trim()
      if (!trimmedName) {
        return res.status(400).json({ message: 'User name cannot be empty' })
      }

      // Check if another user already has this exact or case-insensitive name
      const existingUser = await User.findOne({
        name: { $regex: new RegExp(`^${trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
        _id: { $ne: req.user._id }
      })

      if (existingUser) {
        return res.status(400).json({ message: 'User name is already taken by another user' })
      }

      user.name = trimmedName
    }

    if (about !== undefined) {
      user.about = typeof about === 'string' ? about.trim() : ''
    }

    await user.save()

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || '',
        about: user.about || '',
      }
    })
  } catch (err) {
    next(err)
  }
}
