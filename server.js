const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const rateLimiter = require('./middleware/rateLimiter');
const app = require('./app'); // Import the configured app instance
const errorHandler = require('./middleware/errorHandler'); // Import error handler
const pool = require('./config/db'); // Import db pool (implicitly tests connection)

const PORT = process.env.PORT || 3000;

// Enforce HTTPS in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        next();
    });
}

// Apply rate limiter globally
app.use(rateLimiter);

// Basic Route (Optional - can be kept or moved to app.js if preferred)
app.get('/', (req, res) => {
  res.send('Blogging Platform API is running!');
});

// Protect routes with authentication middleware
app.use('/api/protected', authMiddleware, require('./routes/protectedRoutes'));

// Error Handling Middleware - Should be last middleware applied to the app instance
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
