const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Url = require('../models/Url');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put('/', auth, [
  body('firstName').optional().isLength({ max: 50 }).withMessage('First name must be less than 50 characters'),
  body('lastName').optional().isLength({ max: 50 }).withMessage('Last name must be less than 50 characters'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, bio, avatar } = req.body;

    const user = await User.findById(req.user._id);
    
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json(user.getProfile());
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/profile/password
// @desc    Change password
// @access  Private
router.put('/password', auth, [
  body('currentPassword').exists().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    
    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/profile/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const totalUrls = await Url.countDocuments({ user: req.user._id });
    const activeUrls = await Url.countDocuments({ user: req.user._id, isActive: true });
    const totalClicks = await Url.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: '$clicks' } } }
    ]);

    const recentUrls = await Url.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title originalUrl shortUrl clicks createdAt');

    const topUrls = await Url.find({ user: req.user._id })
      .sort({ clicks: -1 })
      .limit(5)
      .select('title originalUrl shortUrl clicks');

    res.json({
      totalUrls,
      activeUrls,
      totalClicks: totalClicks[0]?.total || 0,
      recentUrls,
      topUrls
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/profile
// @desc    Delete user account
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Delete all URLs associated with the user
    await Url.deleteMany({ user: req.user._id });
    
    // Delete user account
    await User.findByIdAndDelete(req.user._id);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 