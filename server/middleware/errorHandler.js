const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err.message)   // ← add this line
  console.error(err.stack)    
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

module.exports = errorHandler

// In any controller, throw errors like this:
// const err = new Error('Not found')
// err.statusCode = 404
// return next(err)
