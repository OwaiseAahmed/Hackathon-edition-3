import express from "express";
import SavedModule from "../models/SavedModule.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { moduleId, title, video, progress } = req.body;
  try {
    const saved = new SavedModule({
      user: req.userId,
      moduleId,
      title,
      video,
      progress,
    });
    await saved.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save module" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const savedModules = await SavedModule.find({ user: req.userId });
    res.status(200).json(savedModules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved modules" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await SavedModule.findByIdAndUpdate(
      req.params.id,
      { progress: req.body.progress },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await SavedModule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Module removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete module" });
  }
});

export default router;
