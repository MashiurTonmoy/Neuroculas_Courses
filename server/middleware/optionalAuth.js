const { auth } = require('../config/firebaseAdmin');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      if (auth) {
        try {
          const decodedToken = await auth.verifyIdToken(token);
          const decodedEmail = decodedToken.email ? decodedToken.email.toLowerCase().trim() : null;

          let user = await User.findOne({ firebaseUid: decodedToken.uid });
          if (!user && decodedEmail) {
            user = await User.findOne({ email: decodedEmail });
          }
          if (user) {
            req.user = user;
          }
        } catch (firebaseErr) {
          if (process.env.JWT_SECRET) {
            try {
              const legacyDecoded = jwt.verify(token, process.env.JWT_SECRET);
              req.user = await User.findById(legacyDecoded.id).select('-password');
            } catch (jwtErr) {
              // Ignore invalid token
            }
          }
        }
      }
    } catch (err) {
      // Ignore token verification errors for optional auth
    }
  }

  next();
};

module.exports = optionalAuth;
