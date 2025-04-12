const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' }); // 409 Conflict
        }

        // Create new user (password hashing is done in the model)
        const newUser = await User.create({ name, email, password });

        // --- START: Generate JWT after registration ---
        const payload = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // Log the error but might still want to return user created successfully without token
            console.error("JWT_SECRET is not defined. Cannot issue token on registration.");
            // Decide if registration should fail or succeed without a token
            // Option 1: Succeed without token (as originally implemented)
            // return res.status(201).json({ message: 'User registered successfully, but could not issue token.', user: payload });
            // Option 2: Fail registration if token cannot be issued
             return res.status(500).json({ message: "Internal server error (JWT configuration missing)" });
        }

        const token = jwt.sign(
            payload,
            secret,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );
        // --- END: Generate JWT after registration ---

        // Respond with token and user info (excluding password)
        res.status(201).json({
            message: 'User registered successfully',
            token: token, // Include the token in the response
            user: payload // Use payload which excludes password
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Login an existing user
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Unauthorized
        }

        // Compare submitted password with stored hash
        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Unauthorized
        }

        // Passwords match, generate JWT
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
            // Add other relevant non-sensitive info if needed
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ message: "Internal server error (JWT configuration missing)" });
        }

        const token = jwt.sign(
            payload,
            secret,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Token expiration time
        );

        // Respond with token
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: { // Optionally return some user info
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};
