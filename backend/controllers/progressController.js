const Progress = require('../models/Progress');

// @desc Upload learner progress
// @route POST /api/progress
// @access Private (Learner)
const uploadProgress = async (req, res) => {
  const { mentorId, fileUrl } = req.body;

  const progress = await Progress.create({
    learner: req.user._id,
    mentor: mentorId,
    fileUrl,
  });

  res.status(201).json(progress);
};

// @desc Get all submissions assigned to a mentor
// @route GET /api/progress/mentor
// @access Private (Mentor)
const getMentorSubmissions = async (req, res) => {
  const submissions = await Progress.find({ mentor: req.user._id }).populate('learner', 'name email');
  res.json(submissions);
};

// @desc Add feedback to a submission
// @route PUT /api/progress/:id/feedback
// @access Private (Mentor)
const giveFeedback = async (req, res) => {
  const progress = await Progress.findById(req.params.id);

  if (!progress) {
    return res.status(404).json({ message: 'Progress not found' });
  }

  if (progress.mentor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  progress.feedback = req.body.feedback;
  progress.status = 'Reviewed';

  const updated = await progress.save();
  res.json(updated);
};

module.exports = { uploadProgress, getMentorSubmissions, giveFeedback };
