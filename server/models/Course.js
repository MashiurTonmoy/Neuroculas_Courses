const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  owner:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl:      { type: String, required: true },   // Cloudinary URL
  price:        { type: Number, default: 0 },       // 0 = free
  language: { type: String, default: 'English' },
  tags:         [{ type: String }],
  status:       { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  avgRating:    { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
}, { timestamps: true })

// Text index for search  ← this is what makes .find({ $text: { $search: q } }) work
courseSchema.index(
  { title: 'text', description: 'text', tags: 'text' },
  { language_override: 'search_language' } // 👈 stops MongoDB from reading your `language` field
)

module.exports = mongoose.model('Course', courseSchema)
