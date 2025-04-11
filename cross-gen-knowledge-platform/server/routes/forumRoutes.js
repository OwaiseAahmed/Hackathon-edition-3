import express from "express";
import ForumPost from "../models/ForumPost.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate("author", "name")
      .populate("comments.userId", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new ForumPost({
      title,
      content,
      author: req.userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/:postId/comment", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await ForumPost.findById(req.params.postId);
    post.comments.push({ userId: req.userId, text });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/:postId/like", verifyToken, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    const index = post.likes.indexOf(req.userId);

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
