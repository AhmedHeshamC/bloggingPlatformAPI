const express = require('express');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const postRoutes = require('./routes/posts');
const protectedRoutes = require('./routes/protectedRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Enforce HTTPS in production (moved from server.js for better structure)
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

// Basic Route
app.get('/', (req, res) => {
  res.send('Blogging Platform API V1 is running!');
});

// --- API Version 1 Routes ---
const apiV1Router = express.Router();

// Mount auth routes under /api/v1/auth
apiV1Router.use('/auth', authRoutes);

// Mount post routes under /api/v1/posts
apiV1Router.use('/posts', postRoutes);

// Mount protected routes under /api/v1/protected
apiV1Router.use('/protected', authMiddleware, protectedRoutes);

// Mount the v1 router
app.use('/api/v1', apiV1Router);
// --- End API Version 1 Routes ---


// Error Handling Middleware - Should be last middleware applied
app.use(errorHandler);

module.exports = app;
