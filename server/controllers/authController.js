// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Helper — generate JWT token (legacy support)
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

// -----------------------------------------------
// POST /api/auth/sync
// Synchronizes Firebase user session with MongoDB profile
// -----------------------------------------------
exports.syncUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    let user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User authentication failed' });
    }

    let modified = false;

    if (name && name.trim() && user.name !== name.trim()) {
      user.name = name.trim();
      modified = true;
    }

    if (about !== undefined && user.about !== about.trim()) {
      user.about = about.trim();
      modified = true;
    }

    if (modified) {
      await user.save();
    }

    res.json({
      user: {
        id: user._id,
        _id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        avatar: user.avatar || '',
        about: user.about || '',
        createdAt: user.createdAt,
      },
    });

  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// GET /api/auth/me
// Returns current authenticated user profile
// -----------------------------------------------
exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Not authenticated' });
    res.json({
      id: user._id,
      _id: user._id,
      firebaseUid: user.firebaseUid,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      avatar: user.avatar || '',
      about: user.about || '',
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// POST /api/auth/register (Legacy & Direct)
// -----------------------------------------------
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, about, firebaseUid } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'User name and email are required' });
    }

    const trimmedName = name.trim();
    const formattedEmail = email.toLowerCase().trim();
    const trimmedAbout = about ? about.trim() : '';

    // Check duplicate email
    const emailExists = await User.findOne({ email: formattedEmail });
    if (emailExists) {
      // If user exists, update firebaseUid if provided
      if (firebaseUid && !emailExists.firebaseUid) {
        emailExists.firebaseUid = firebaseUid;
        await emailExists.save();
      }
      return res.json({
        user: {
          id: emailExists._id,
          _id: emailExists._id,
          firebaseUid: emailExists.firebaseUid,
          name: emailExists.name,
          email: emailExists.email,
          emailVerified: emailExists.emailVerified,
          role: emailExists.role,
          avatar: emailExists.avatar || '',
          about: emailExists.about || '',
        }
      });
    }

    const user = await User.create({
      name: trimmedName,
      email: formattedEmail,
      password: password || undefined,
      firebaseUid: firebaseUid || undefined,
      about: trimmedAbout,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        _id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        avatar: user.avatar || '',
        about: user.about || '',
      }
    });

  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// POST /api/auth/login (Legacy & Direct)
// -----------------------------------------------
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await user.matchPassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        _id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        avatar: user.avatar || '',
        about: user.about || '',
      }
    });

  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// POST /api/auth/forgot-password
// -----------------------------------------------
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Return generic success to avoid email enumeration
      return res.json({
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request - Neuroculas Courses',
      text: `Password reset requested for ${user.email}`,
    });

    res.json({
      message: 'If an account with that email exists, a password reset link has been sent.',
    });

  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// POST /api/auth/reset-password
// -----------------------------------------------
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Reset token and new password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    res.json({ message: 'Password reset successfully! You can now log in with your new password.' });

  } catch (err) {
    next(err);
  }
};