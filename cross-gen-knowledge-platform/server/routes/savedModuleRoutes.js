import express from "express";
import {
  saveModule,
  getSavedModules,
  deleteSavedModule,
} from "../controllers/savedModuleController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveModule);
router.get("/", authMiddleware, getSavedModules);
router.delete("/:id", authMiddleware, deleteSavedModule);

export default router;
