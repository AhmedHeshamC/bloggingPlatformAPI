const express = require('express');
const postController = require('../controllers/postController');
const { validatePost, validateUpdate } = require('../middleware/validation'); // Assuming validation middleware exists

const router = express.Router();

// GET /posts - Get all posts (with optional search term)
router.get('/', postController.getAllPosts);

// POST /posts - Create a new post
router.post('/', validatePost, postController.createPost);

// GET /posts/:id - Get a single post by ID
router.get('/:id', postController.getPostById);

// PUT /posts/:id - Update a post by ID
router.put('/:id', validateUpdate, postController.updatePost);

// DELETE /posts/:id - Delete a post by ID
router.delete('/:id', postController.deletePost);

module.exports = router;
