// controllers/authController.js
const User = require('../models/User');
const jwt  = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Helper — generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

// -----------------------------------------------
// POST /api/auth/register
// -----------------------------------------------
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'User name, email and password are required' });
    }

    const trimmedName = name.trim();
    const formattedEmail = email.toLowerCase().trim();

    // Check duplicate username (case-insensitive)
    const nameExists = await User.findOne({
      name: { $regex: new RegExp(`^${trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
    });

    if (nameExists) {
      return res.status(400).json({ message: 'This user name is already taken' });
    }

    // Check duplicate email
    const emailExists = await User.findOne({ email: formattedEmail });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({ name: trimmedName, email: formattedEmail, password });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// POST /api/auth/login
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
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
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
      return res.status(404).json({ message: 'No account found with that email address' });
    }

    // Generate short-lived reset JWT token (15 mins)
    const resetJwtToken = jwt.sign(
      { id: user._id, type: 'password_reset' },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '15m' }
    );

    // Hash token to store in database for 1-time usage validation
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetJwtToken)
      .digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Construct reset link URL
    const clientUrl = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password?token=${resetJwtToken}`;

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0f2fe; borderRadius: 12px; background-color: #f8fafc;">
        <h2 style="color: #0284c7; text-align: center;">Reset Your Password</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>You requested to reset your password for your Neuroculas Courses account.</p>
        <p>Please click the button below to set a new password. This link is valid for <strong>15 minutes</strong>:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #0284c7; color: #ffffff; padding: 12px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #64748b; font-size: 0.9em;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 0.8em; text-align: center;">Neuroculas Courses &copy; 2026</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request - Neuroculas Courses',
      text: `Click here to reset your password: ${resetUrl}`,
      html: htmlMessage,
    });

    res.json({
      message: 'Password reset link has been sent! Please check your email inbox or spam folder for the reset link.',
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

    // 1. Verify JWT signature and expiration
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    if (decoded.type !== 'password_reset') {
      return res.status(400).json({ message: 'Invalid reset token type' });
    }

    // 2. Hash token to check database record
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // 3. Find user matching token hash and non-expired token
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has already been used' });
    }

    // 4. Set new password & invalidate token
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successfully! You can now log in with your new password.' });

  } catch (err) {
    next(err);
  }
};