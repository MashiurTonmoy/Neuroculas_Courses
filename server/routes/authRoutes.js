// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const { register, login, syncUser, getMe, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/sync', protect, syncUser);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;