const { auth } = require('../config/firebaseAdmin');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    let decodedUid = null;
    let decodedEmail = null;
    let isEmailVerified = false;

    // 1. Try verifying with Firebase Admin SDK first
    if (auth) {
      try {
        const decodedToken = await auth.verifyIdToken(token);
        decodedUid = decodedToken.uid;
        decodedEmail = decodedToken.email ? decodedToken.email.toLowerCase().trim() : null;
        isEmailVerified = !!decodedToken.email_verified;
      } catch (firebaseErr) {
        // Fallback check for legacy JWT tokens during transition
        if (process.env.JWT_SECRET) {
          try {
            const legacyDecoded = jwt.verify(token, process.env.JWT_SECRET);
            const legacyUser = await User.findById(legacyDecoded.id).select('-password');
            if (legacyUser) {
              req.user = legacyUser;
              return next();
            }
          } catch (jwtErr) {
            // Ignored, proceed to 401 response below
          }
        }
        return res.status(401).json({ message: 'Invalid or expired Firebase ID token' });
      }
    } else if (process.env.JWT_SECRET) {
      // If Firebase Admin SDK is unconfigured, fallback to legacy JWT
      const legacyDecoded = jwt.verify(token, process.env.JWT_SECRET);
      const legacyUser = await User.findById(legacyDecoded.id).select('-password');
      if (!legacyUser) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = legacyUser;
      return next();
    }

    if (!decodedUid) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    // 2. Find MongoDB user record by firebaseUid or email
    let user = await User.findOne({ firebaseUid: decodedUid });

    if (!user && decodedEmail) {
      // Check by email to link legacy MongoDB account to Firebase UID
      user = await User.findOne({ email: decodedEmail });
      if (user) {
        user.firebaseUid = decodedUid;
        user.emailVerified = isEmailVerified;
        await user.save();
      }
    }

    // 3. Auto-sync new user if not present in MongoDB
    if (!user && decodedEmail) {
      user = await User.create({
        name: decodedEmail.split('@')[0],
        email: decodedEmail,
        firebaseUid: decodedUid,
        emailVerified: isEmailVerified,
        role: 'user',
      });
    }

    if (!user) {
      return res.status(401).json({ message: 'User account not found in database' });
    }

    // Keep emailVerified flag synced
    if (user.emailVerified !== isEmailVerified) {
      user.emailVerified = isEmailVerified;
      await user.save();
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Protect Middleware Error:', err.message);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = protect;
