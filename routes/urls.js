const express = require('express');
const { body, validationResult } = require('express-validator');
const Url = require('../models/Url');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/urls
// @desc    Create a new shortened URL
// @access  Private
router.post('/', auth, [
  body('originalUrl').isURL().withMessage('Please enter a valid URL'),
  body('title').optional().isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { originalUrl, title, description, tags, expiresAt } = req.body;

    // Create short code
    const shortCode = require('nanoid').nanoid(8);
    const shortUrl = `${req.protocol}://${req.get('host')}/api/urls/redirect/${shortCode}`;

    const url = new Url({
      originalUrl,
      shortUrl,
      shortCode,
      user: req.user._id,
      title,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    await url.save();

    res.json(url);
  } catch (error) {
    console.error('Create URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/urls
// @desc    Get all URLs for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const query = { user: req.user._id };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { originalUrl: { $regex: search, $options: 'i' } }
      ];
    }

    const urls = await Url.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Url.countDocuments(query);

    res.json({
      urls,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get URLs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/urls/redirect/:shortCode
// @desc    Redirect to original URL
// @access  Public
router.get('/redirect/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (!url.isActive) {
      return res.status(410).json({ message: 'URL is inactive' });
    }

    if (url.isExpired()) {
      return res.status(410).json({ message: 'URL has expired' });
    }

    // Increment clicks
    await url.incrementClicks();

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/urls/:id
// @desc    Get specific URL by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    res.json(url);
  } catch (error) {
    console.error('Get URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/urls/:id
// @desc    Update URL
// @access  Private
router.put('/:id', auth, [
  body('title').optional().isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tags, isActive, expiresAt } = req.body;

    const url = await Url.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    url.title = title || url.title;
    url.description = description || url.description;
    url.tags = tags ? tags.split(',').map(tag => tag.trim()) : url.tags;
    url.isActive = isActive !== undefined ? isActive : url.isActive;
    url.expiresAt = expiresAt ? new Date(expiresAt) : url.expiresAt;

    await url.save();

    res.json(url);
  } catch (error) {
    console.error('Update URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/urls/:id
// @desc    Delete URL
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    await url.remove();

    res.json({ message: 'URL removed' });
  } catch (error) {
    console.error('Delete URL error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 