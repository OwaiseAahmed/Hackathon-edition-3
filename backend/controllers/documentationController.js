const Documentation = require('../models/Documentation');

// Create documentation
const createDocumentation = async (req, res) => {
  const { title, description, contentType, tags, contentUrl } = req.body;

  const doc = new Documentation({
    title,
    description,
    contentType,
    contentUrl,
    tags,
    createdBy: req.user._id,
  });

  const savedDoc = await doc.save();
  res.status(201).json(savedDoc);
};

// Get all docs by user
const getMyDocs = async (req, res) => {
  const docs = await Documentation.find({ createdBy: req.user._id });
  res.json(docs);
};

// Get one doc
const getDocById = async (req, res) => {
  const doc = await Documentation.findById(req.params.id);
  if (doc) {
    res.json(doc);
  } else {
    res.status(404).json({ message: 'Documentation not found' });
  }
};

// Update doc
const updateDoc = async (req, res) => {
  const doc = await Documentation.findById(req.params.id);
  if (doc && doc.createdBy.toString() === req.user._id.toString()) {
    doc.title = req.body.title || doc.title;
    doc.description = req.body.description || doc.description;
    doc.tags = req.body.tags || doc.tags;
    doc.contentType = req.body.contentType || doc.contentType;
    doc.contentUrl = req.body.contentUrl || doc.contentUrl;

    const updatedDoc = await doc.save();
    res.json(updatedDoc);
  } else {
    res.status(403).json({ message: 'Not authorized or not found' });
  }
};

// Delete doc
const deleteDoc = async (req, res) => {
  const doc = await Documentation.findById(req.params.id);
  if (doc && doc.createdBy.toString() === req.user._id.toString()) {
    await doc.remove();
    res.json({ message: 'Documentation deleted' });
  } else {
    res.status(403).json({ message: 'Not authorized or not found' });
  }
};

module.exports = {
  createDocumentation,
  getMyDocs,
  getDocById,
  updateDoc,
  deleteDoc,
};
