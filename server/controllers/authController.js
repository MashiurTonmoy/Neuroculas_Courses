// controllers/authController.js
const User = require('../models/User')
const jwt  = require('jsonwebtoken')

// Helper — generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

// -----------------------------------------------
// POST /api/auth/register
// -----------------------------------------------
exports.register = async (req, res, next) => {   // ← next MUST be here
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const user = await User.create({ name, email, password })
    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })

  } catch (err) {
    next(err)   // ← this only works if next is in the parameters above
  }
}

// -----------------------------------------------
// POST /api/auth/login
// -----------------------------------------------
exports.login = async (req, res, next) => {   // ← next MUST be here
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const match = await user.matchPassword(password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })

  } catch (err) {
    next(err)
  }
}