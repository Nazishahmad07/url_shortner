const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(8)
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  clicks: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastClicked: {
    type: Date
  }
});

// Index for faster queries
urlSchema.index({ shortCode: 1 });
urlSchema.index({ user: 1 });
urlSchema.index({ createdAt: -1 });

// Method to increment clicks
urlSchema.methods.incrementClicks = function() {
  this.clicks += 1;
  this.lastClicked = new Date();
  return this.save();
};

// Method to check if URL is expired
urlSchema.methods.isExpired = function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

module.exports = mongoose.model('Url', urlSchema); 