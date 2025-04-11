const mongoose = require('mongoose');

const documentationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    contentType: {
      type: String,
      enum: ['text', 'image', 'video'],
      default: 'text',
    },
    contentUrl: { type: String }, // path to uploaded file or text
    tags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Documentation', documentationSchema);
