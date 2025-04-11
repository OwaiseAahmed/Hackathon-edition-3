const LearningModule = require('../models/LearningModule');

// @desc    Create a new learning module
const createModule = async (req, res) => {
  const { title, description, type, resourceUrl, tags, isPublic } = req.body;

  const newModule = new LearningModule({
    title,
    description,
    type,
    resourceUrl,
    tags,
    isPublic,
    createdBy: req.user._id,
  });

  const saved = await newModule.save();
  res.status(201).json(saved);
};

// @desc    Get all public modules + user's own private ones
const getModules = async (req, res) => {
  const modules = await LearningModule.find({
    $or: [{ isPublic: true }, { createdBy: req.user._id }],
  }).populate('createdBy', 'name');
  res.json(modules);
};

// @desc    Get single module
const getModuleById = async (req, res) => {
  const module = await LearningModule.findById(req.params.id);
  if (!module) return res.status(404).json({ message: 'Module not found' });
  res.json(module);
};

// @desc    Update module
const updateModule = async (req, res) => {
  const module = await LearningModule.findById(req.params.id);
  if (!module) return res.status(404).json({ message: 'Not found' });

  if (module.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  Object.assign(module, req.body);
  const updated = await module.save();
  res.json(updated);
};

// @desc    Delete module
const deleteModule = async (req, res) => {
  const module = await LearningModule.findById(req.params.id);
  if (!module) return res.status(404).json({ message: 'Not found' });

  if (module.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await module.remove();
  res.json({ message: 'Deleted' });
};

module.exports = {
  createModule,
  getModules,
  getModuleById,
  updateModule,
  deleteModule,
};
