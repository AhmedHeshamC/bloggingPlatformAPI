const { body } = require('express-validator');

exports.validatePost = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required.')
    .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters.'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required.'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required.')
    .isLength({ max: 100 }).withMessage('Category cannot exceed 100 characters.'),
  body('tags')
    .optional() // Tags are optional
    .isArray().withMessage('Tags must be an array.')
    .custom((tags) => { // Custom validation for tag elements
        if (!tags) return true; // Skip if optional field is not present
        return tags.every(tag => typeof tag === 'string' && tag.trim().length > 0 && tag.length <= 50);
    }).withMessage('Each tag must be a non-empty string up to 50 characters.'),
];

// Validation for update is often the same as create, but fields might be optional
// Here, we make them required as per PUT semantics (replace the resource)
// If PATCH were used, fields would be optional.
exports.validateUpdate = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters.'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required.'),
    body('category')
        .trim()
        .notEmpty().withMessage('Category is required.')
        .isLength({ max: 100 }).withMessage('Category cannot exceed 100 characters.'),
    body('tags')
        .optional()
        .isArray().withMessage('Tags must be an array.')
        .custom((tags) => {
            if (!tags) return true;
            return tags.every(tag => typeof tag === 'string' && tag.trim().length > 0 && tag.length <= 50);
        }).withMessage('Each tag must be a non-empty string up to 50 characters.'),
];
