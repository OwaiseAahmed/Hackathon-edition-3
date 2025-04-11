import SavedModule from "../models/SavedModule.js";


export const saveModule = async (req, res) => {
  try {
    const { moduleTitle, progress, videoUrl } = req.body;
    const userId = req.userId;

    const newModule = new SavedModule({
      userId,
      moduleTitle,
      progress,
      videoUrl,
    });

    await newModule.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(500).json({ message: "Error saving module", error: err.message });
  }
};

export const getSavedModules = async (req, res) => {
  try {
    const modules = await SavedModule.find({ userId: req.userId });
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: "Error fetching modules", error: err.message });
  }
};

export const deleteSavedModule = async (req, res) => {
  try {
    await SavedModule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Module removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting module", error: err.message });
  }
};
