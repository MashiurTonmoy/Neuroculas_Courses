// routes/authRoutes.js
const express  = require('express')
const router   = express.Router()
const protect  = require('../middleware/protect')
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/me', protect, (req, res) => res.json(req.user))

module.exports = router