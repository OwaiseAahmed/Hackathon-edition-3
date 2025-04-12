const mongoose = require('mongoose');

const mentorshipSlotSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String, // e.g., '2025-04-13'
    required: true,
  },
  time: {
    type: String, // e.g., '14:00'
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MentorshipSlot', mentorshipSlotSchema);
