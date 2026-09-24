// routes/authRoutes.js
const express  = require('express')
const router   = express.Router()
const protect  = require('../middleware/protect')
const { register, login } = require('../controllers/authController')

router.post('/register', register)     // ← register is the handler, not middleware
router.post('/login', login)
router.get('/me', protect, (req, res) => res.json(req.user))

module.exports = router