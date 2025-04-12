const ForumThread = require('../models/ForumThread');

// Create a new thread
const createThread = async (req, res) => {
  const { title, content, tags } = req.body;

  const thread = await ForumThread.create({
    title,
    content,
    tags,
    createdBy: req.user._id,
  });

  res.status(201).json(thread);
};

// Get all threads (optionally filtered by tag)
const getThreads = async (req, res) => {
  const tagFilter = req.query.tag ? { tags: req.query.tag } : {};
  const threads = await ForumThread.find(tagFilter).populate('createdBy', 'name role');
  res.json(threads);
};

// Get single thread with replies
const getThreadById = async (req, res) => {
  const thread = await ForumThread.findById(req.params.id).populate('createdBy', 'name role');
  if (!thread) return res.status(404).json({ message: 'Thread not found' });
  res.json(thread);
};

// Reply to thread
const replyToThread = async (req, res) => {
  const { message } = req.body;

  const thread = await ForumThread.findById(req.params.id);
  if (!thread) return res.status(404).json({ message: 'Thread not found' });

  thread.replies.push({
    user: req.user._id,
    message,
  });

  await thread.save();
  res.status(201).json({ message: 'Reply added' });
};

module.exports = {
  createThread,
  getThreads,
  getThreadById,
  replyToThread,
};
