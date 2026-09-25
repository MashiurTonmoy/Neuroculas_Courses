require('dotenv').config() 
const express    = require('express')
const cors       = require('cors')
const morgan     = require('morgan')
const rateLimit  = require('express-rate-limit')
const connectDB  = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

const app = express()
connectDB()

// 1. CORS — must be FIRST
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : '';

    if (
      origin === clientUrl ||
      origin.endsWith('.netlify.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials:    true,
  methods:        ['GET','POST','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}))

// Body parser — before routes read req.body
app.use(express.json())

// Logger
app.use(morgan('dev'))

// Rate limiter — protects auth routes
const limiter = rateLimit({ windowMs: 60*1000, max: 50 })
app.use('/api/auth', limiter)

// Health Check Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Neuroculas API is running successfully' });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Neuroculas API endpoint active' });
});

// 5. Routes
app.use('/api/auth',     require('./routes/authRoutes'))
app.use('/api/users',    require('./routes/userRoutes'))
app.use('/api/courses',  require('./routes/courseRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))
app.use('/api/courses',  require('./routes/reviewRoutes'))
app.use('/api/admin',    require('./routes/adminRoutes'))

// 6. Error handler — must be LAST
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

