const express = require('express')
const router  = express.Router()
const { getUsers } = require('../controllers/userController')

// GET /api/users — get all users with optional name search ?q=name
router.get('/', getUsers)

module.exports = router
