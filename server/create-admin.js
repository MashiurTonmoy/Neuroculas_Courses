require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const connectDB = require('./config/db')

const createAdmin = async () => {
  const args = process.argv.slice(2)
  const email = args[0] || 'admin@neuroculas.com'
  const password = args[1] || 'admin123'
  const name = args[2] || 'Admin User'

  try {
    await connectDB()

    let user = await User.findOne({ email })
    if (user) {
      user.role = 'admin'
      user.password = password
      await user.save()
      console.log(`✅ Existing user '${email}' has been promoted to ADMIN and password reset to '${password}'.`)
    } else {
      user = await User.create({
        name,
        email,
        password,
        role: 'admin',
      })
      console.log(`✅ New Admin user created successfully!`)
      console.log(`Email:    ${email}`)
      console.log(`Password: ${password}`)
      console.log(`Role:     admin`)
    }
    process.exit(0)
  } catch (err) {
    console.error('❌ Error creating admin user:', err.message)
    process.exit(1)
  }
}

createAdmin()
