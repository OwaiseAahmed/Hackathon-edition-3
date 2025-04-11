import mongoose from "mongoose";

const SavedModuleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleTitle: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  videoUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("SavedModule", SavedModuleSchema);
