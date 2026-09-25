const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');

async function testApiFlow() {
  console.log('🚀 Starting API Request & Status Verification Test...\n');

  // 1. Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB.');

  const testEmail = 'neuroculas@gmail.com';

  // Ensure test user exists in MongoDB
  let user = await User.findOne({ email: testEmail });
  if (!user) {
    user = await User.create({
      name: 'Neuroculas Admin',
      email: testEmail,
      password: 'initialPassword123!',
      role: 'admin',
    });
    console.log(`✅ Created test user in MongoDB: ${testEmail}`);
  } else {
    console.log(`✅ Found existing user in MongoDB: ${testEmail}`);
  }

  // 2. Start temporary test Express server
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);

  const server = app.listen(5099, async () => {
    console.log('✅ Temporary Test Server running on http://localhost:5099');

    try {
      // -------------------------------------------------------------
      // TEST 1: POST /api/auth/forgot-password
      // -------------------------------------------------------------
      console.log(`\n--------------------------------------------------`);
      console.log(`📡 [TEST 1] Sending POST /api/auth/forgot-password for "${testEmail}"...`);
      
      const forgotRes = await fetch('http://localhost:5099/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail }),
      });

      const forgotData = await forgotRes.json();
      console.log(`STATUS CODE: ${forgotRes.status} ${forgotRes.statusText}`);
      console.log(`RESPONSE BODY:`, forgotData);

      if (forgotRes.status !== 200) {
        throw new Error(`Forgot Password request failed with status ${forgotRes.status}`);
      }

      const resetUrl = forgotData.resetUrl;
      const urlObj = new URL(resetUrl);
      const token = urlObj.searchParams.get('token');

      console.log(`\n🔑 Extracted Reset JWT Token: ${token.substring(0, 30)}...`);

      // -------------------------------------------------------------
      // TEST 2: POST /api/auth/reset-password
      // -------------------------------------------------------------
      console.log(`\n--------------------------------------------------`);
      console.log(`📡 [TEST 2] Sending POST /api/auth/reset-password with new password...`);

      const resetRes = await fetch('http://localhost:5099/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: 'newSecurePassword123!' }),
      });

      const resetData = await resetRes.json();
      console.log(`STATUS CODE: ${resetRes.status} ${resetRes.statusText}`);
      console.log(`RESPONSE BODY:`, resetData);

      if (resetRes.status !== 200) {
        throw new Error(`Reset Password request failed with status ${resetRes.status}`);
      }

      // -------------------------------------------------------------
      // TEST 3: Attempt Token Reuse (Single-Use Verification)
      // -------------------------------------------------------------
      console.log(`\n--------------------------------------------------`);
      console.log(`📡 [TEST 3] Testing Token Invalidation (Attempting reuse of same token)...`);

      const reuseRes = await fetch('http://localhost:5099/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: 'anotherPassword123!' }),
      });

      const reuseData = await reuseRes.json();
      console.log(`STATUS CODE: ${reuseRes.status} ${reuseRes.statusText}`);
      console.log(`RESPONSE BODY:`, reuseData);

      if (reuseRes.status === 400) {
        console.log(`\n🔒 Security Verification Passed: Reused token was correctly REJECTED by backend (400 Bad Request)!`);
      } else {
        throw new Error(`Security failed: Reused token was not rejected! Status: ${reuseRes.status}`);
      }

      console.log(`\n==================================================`);
      console.log(`🎉 ALL API ENDPOINT TESTS PASSED SUCCESSFULLY!`);
      console.log(`==================================================`);

    } catch (err) {
      console.error(`❌ API Test Failed:`, err.message);
    } finally {
      server.close();
      await mongoose.disconnect();
      console.log('🏁 Closed test server and DB connection.');
      process.exit(0);
    }
  });
}

testApiFlow();
