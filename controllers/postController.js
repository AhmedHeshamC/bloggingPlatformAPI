const { validationResult } = require('express-validator');
const Post = require('../models/postModel');

// Get all posts (handles search)
exports.getAllPosts = async (req, res, next) => {
  try {
    const { term } = req.query;
    const posts = await Post.findAll(term);
    res.status(200).json(posts);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Create a new post
exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, category, tags } = req.body;
    const newPost = await Post.create({ title, content, category, tags });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// Get a single post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Update a post by ID
exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const postId = req.params.id;
    const { title, content, category, tags } = req.body;
    const updatedPost = await Post.updateById(postId, { title, content, category, tags });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete a post by ID
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const success = await Post.deleteById(postId);
    if (!success) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
