const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  course:   { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },
  rating:   { type: Number, min: 1, max: 5, required: true },
  comment:  { type: String, default: '' },
}, { timestamps: true })

// One review per user per course
reviewSchema.index({ course: 1, reviewer: 1 }, { unique: true })

// After saving, auto-update course avgRating
reviewSchema.post('save', async function() {
  const Course = require('./Course')
  const reviews = await this.constructor.find({ course: this.course })
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  await Course.findByIdAndUpdate(this.course, {
    avgRating:    avg.toFixed(1),
    totalReviews: reviews.length
  })
})

module.exports = mongoose.model('Review', reviewSchema)
