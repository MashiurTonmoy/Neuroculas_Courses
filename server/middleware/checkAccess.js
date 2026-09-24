const Purchase = require('../models/Purchase')
const Course   = require('../models/Course')

const checkAccess = async (req, res, next) => {
  const course = await Course.findById(req.params.id)
  if (!course) return res.status(404).json({ message: 'Course not found' })

  // Free courses, course owners, or admins — always allow download
  const isOwner = course.owner.toString() === req.user._id.toString()
  const isAdmin = req.user.role === 'admin'
  if (course.price === 0 || isOwner || isAdmin) return next()

  // Paid courses — check purchase record
  const purchase = await Purchase.findOne({
    buyer: req.user._id,
    course: req.params.id
  })

  if (!purchase) {
    return res.status(403).json({ message: 'Please purchase this course first' })
  }

  next()
}

module.exports = checkAccess
