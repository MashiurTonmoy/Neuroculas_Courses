require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Course = require('./models/Course')
const Purchase = require('./models/Purchase')
const Review = require('./models/Review')
const connectDB = require('./config/db')

const resetDatabase = async () => {
  try {
    console.log('Connecting to database...')
    await connectDB()

    console.log('Clearing all collections...')
    await User.deleteMany({})
    await Course.deleteMany({})
    await Purchase.deleteMany({})
    await Review.deleteMany({})

    console.log('Creating new Admin user...')
    const admin = await User.create({
      name: 'Neuroculas Admin',
      email: 'neuroculas@gmail.com',
      password: 'neuroculas@courses',
      role: 'admin',
    })

    console.log('===================================================')
    console.log('✅ Database reset complete!')
    console.log('All users, courses, purchases, and reviews deleted.')
    console.log('---------------------------------------------------')
    console.log('New Admin Created:')
    console.log(`Name:     ${admin.name}`)
    console.log(`Email:    ${admin.email}`)
    console.log(`Password: neuroculas@courses`)
    console.log(`Role:     ${admin.role}`)
    console.log('===================================================')

    process.exit(0)
  } catch (err) {
    console.error('❌ Error resetting database:', err.message)
    process.exit(1)
  }
}

resetDatabase()
