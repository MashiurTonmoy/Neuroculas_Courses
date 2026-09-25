const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar:   { type: String, default: '' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true })

// ✅ Correct — async hook WITHOUT next parameter
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return   // ← just return, no next()
  this.password = await bcrypt.hash(this.password, 10)
  // no next() needed — async functions resolve automatically
})

// Method to check password on login
userSchema.methods.matchPassword = async function(plain) {
  return bcrypt.compare(plain, this.password)
}

module.exports = mongoose.model('User', userSchema)