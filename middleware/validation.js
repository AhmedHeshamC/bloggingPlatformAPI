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

exports.validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Must be a valid email address.')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
        // Optional: Add more password complexity rules if needed
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        // .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
];

exports.validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Must be a valid email address.')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required.')
];
