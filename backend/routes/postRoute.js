import express from 'express';
import { createPost, deletePost, getPostBySlug, getPosts, incrementViews, postComment, toggleLikePost, updatePost } from '../controllers/postController.js';
import { protect } from '../middleware/protect.js';

const blog = express.Router();

// Public routes
blog.get("/", getPosts);
 blog.get("/:slug", getPostBySlug);

// Protected routes
 blog.post("/", protect, createPost);
 blog.put("/:id", protect, updatePost);
 blog.delete("/:id", protect, deletePost);

 blog.post('/like/:id',protect,postComment)
// Post actions
 blog.patch("/:id/like", protect, toggleLikePost);
 blog.put("/:id/views", protect,incrementViews);

export default blog;