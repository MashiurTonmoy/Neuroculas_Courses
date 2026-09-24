const authorizeRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      message: `Role '${req.user.role}' is not allowed here`
    })
  }
  next()
}

module.exports = authorizeRole

// Usage on an admin route:
// router.patch('/approve/:id', protect, authorizeRole('admin'), approveCourse)
