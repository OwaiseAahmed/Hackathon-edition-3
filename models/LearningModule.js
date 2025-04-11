const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ['text', 'video', '3d-model'],
      required: true,
    },
    resourceUrl: {
      type: String, // URL to video or 3D model, or file path
    },
    tags: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningModule', learningModuleSchema);
