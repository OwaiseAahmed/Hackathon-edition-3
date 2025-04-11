import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllPosts,
  deletePost,
  getAllListings,
  deleteListing,
} from "../controllers/adminController.js";

const router = express.Router();


router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/posts", getAllPosts);
router.delete("/posts/:id", deletePost);

router.get("/listings", getAllListings);
router.delete("/listings/:id", deleteListing);

export default router;
