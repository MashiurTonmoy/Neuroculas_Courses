const express      = require('express')
const router       = express.Router()
const multer       = require('multer')
const protect      = require('../middleware/protect')
const optionalAuth = require('../middleware/optionalAuth')
const checkAccess  = require('../middleware/checkAccess')
const {
  getCourses, getCourse, createCourse, updateCourse, downloadCourse, deleteCourse,
  getMyPurchases, getMyUploads, enrollFree
} = require('../controllers/courseController')

// Multer config — Documents & Archives (PDF, DOCX, PPTX, XLSX, ZIP, TXT), 10MB max
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.zip', '.rar', '.txt', '.csv']
    const ext = file.originalname ? file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.')) : ''
    
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Allowed: PDF, DOCX, PPTX, XLSX, ZIP, TXT'), false)
    }
  }
})

// Middleware wrapper for multer error handling
const handleUpload = (req, res, next) => {
  upload.single('document')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds 10MB limit' })
      }
      return res.status(400).json({ message: err.message })
    } else if (err) {
      return res.status(400).json({ message: err.message })
    }
    next()
  })
}

// Protected routes that need to come BEFORE /:id to avoid conflict
router.get('/my-purchases', protect, getMyPurchases)
router.get('/my-uploads',   protect, getMyUploads)

// Public / Optional Auth routes
router.get('/',    optionalAuth, getCourses)   // GET /api/courses?q=react&lang=english
router.get('/:id', optionalAuth, getCourse)    // GET /api/courses/:id

// Protected routes (must be logged in)
router.post('/',                protect, handleUpload, createCourse)
router.put('/:id',              protect, handleUpload, updateCourse)
router.get('/:id/download',     protect, checkAccess, downloadCourse)
router.post('/:id/enroll-free', protect, enrollFree)
router.delete('/:id',           protect, deleteCourse)

module.exports = router
