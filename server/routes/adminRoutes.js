const router        = require('express').Router()
const protect       = require('../middleware/protect')
const authorizeRole = require('../middleware/authorizeRole')
const { getPending, approveCourse, rejectCourse, getStats }
  = require('../controllers/adminController')

// ALL admin routes: must be logged in AND be an admin
router.use(protect, authorizeRole('admin'))

router.get('/pending',       getPending)
router.patch('/approve/:id', approveCourse)
router.patch('/reject/:id',  rejectCourse)
router.get('/stats',         getStats)

module.exports = router


