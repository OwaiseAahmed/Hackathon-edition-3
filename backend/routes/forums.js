const express = require('express');
const router = express.Router();
const {
  createThread,
  getThreads,
  getThreadById,
  replyToThread,
} = require('../controllers/forumController');
const { protect } = require('../middleware/authMiddleware');

// GET all threads or by tag
router.get('/', getThreads);

// GET a specific thread
router.get('/:id', getThreadById);

// POST new thread
router.post('/', protect, createThread);

// POST reply to thread
router.post('/:id/reply', protect, replyToThread);

module.exports = router;
