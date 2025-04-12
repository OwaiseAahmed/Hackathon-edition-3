const MentorshipSlot = require('../models/MentorshipSlot');

// Mentors create availability
const createAvailability = async (req, res) => {
  const { date, time } = req.body;

  const exists = await MentorshipSlot.findOne({
    mentor: req.user._id,
    date,
    time,
  });

  if (exists) {
    return res.status(400).json({ message: 'Slot already exists' });
  }

  const slot = await MentorshipSlot.create({
    mentor: req.user._id,
    date,
    time,
  });

  res.status(201).json(slot);
};

// Learners view available slots for a mentor
const getAvailableSlots = async (req, res) => {
  const mentorId = req.params.mentorId;

  const slots = await MentorshipSlot.find({
    mentor: mentorId,
    isBooked: false,
  });

  res.json(slots);
};

// Learners book a slot
const bookSlot = async (req, res) => {
  const slot = await MentorshipSlot.findById(req.params.slotId);

  if (!slot) {
    return res.status(404).json({ message: 'Slot not found' });
  }

  if (slot.isBooked) {
    return res.status(400).json({ message: 'Slot already booked' });
  }

  slot.isBooked = true;
  slot.bookedBy = req.user._id;
  await slot.save();

  res.json({ message: 'Slot booked successfully', slot });
};

module.exports = {
  createAvailability,
  getAvailableSlots,
  bookSlot,
};
