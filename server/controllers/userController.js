const User   = require('../models/User')
const Course = require('../models/Course')

// ----------------------------------------------------------
// GET /api/users?q=name
// Public — search users by name and include upload counts
// ----------------------------------------------------------
exports.getUsers = async (req, res, next) => {
  try {
    const { q, search } = req.query
    const searchTerm = (q || search || '').trim()

    let filter = {}
    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: 'i' }
    }

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 })

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
      avatar: user.avatar,
      createdAt: user.createdAt,
      uploadCount: countMap[user._id.toString()] || 0
    }))

    res.json(result)
  } catch (err) {
    next(err)
  }
}
