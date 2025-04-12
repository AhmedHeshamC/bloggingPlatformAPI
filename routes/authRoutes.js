const express = require('express');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');

const router = express.Router();

// POST /api/v1/auth/register - Register a new user
router.post('/register', validateRegister, authController.register);

// POST /api/v1/auth/login - Login a user and get a JWT
router.post('/login', validateLogin, authController.login);

module.exports = router;
