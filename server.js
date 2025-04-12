const app = require('./app'); // Import the configured app instance
const pool = require('./config/db'); // Import db pool (implicitly tests connection)

const PORT = process.env.PORT || 3000;

// HTTPS enforcement, rate limiter, basic route, protected routes, and error handler are now in app.js

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - API V1 available at /api/v1`);
});
