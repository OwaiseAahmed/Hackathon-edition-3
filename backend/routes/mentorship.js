const express = require('express');
const router = express.Router();
const {
  createAvailability,
  getAvailableSlots,
  bookSlot,
} = require('../controllers/mentorshipController');
const { protect, isMentor, isLearner } = require('../middleware/authMiddleware');

router.post('/availability', protect, isMentor, createAvailability);
router.get('/availability/:mentorId', protect, getAvailableSlots);
router.post('/book/:slotId', protect, isLearner, bookSlot);

module.exports = router;
