const express = require('express');
const router = express.Router();
const {
  uploadProgress,
  getMentorSubmissions,
  giveFeedback,
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

// Learner uploads progress
router.post('/', protect, restrictTo('Learner'), uploadProgress);

// Mentor views submissions
router.get('/mentor', protect, restrictTo('Mentor'), getMentorSubmissions);

// Mentor provides feedback
router.put('/:id/feedback', protect, restrictTo('Mentor'), giveFeedback);

module.exports = router;
