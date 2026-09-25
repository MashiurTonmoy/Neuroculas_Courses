const express = require('express')
const router  = express.Router()
const { getUsers, getUserById, updateUserProfile } = require('../controllers/userController')
const protect = require('../middleware/protect')

// GET /api/users — get all users with optional name search ?q=name
router.get('/', getUsers)

// PUT /api/users/profile — update current user profile (name & about)
router.put('/profile', protect, updateUserProfile)

// GET /api/users/:id — get single user details by ID
router.get('/:id', getUserById)

module.exports = router
