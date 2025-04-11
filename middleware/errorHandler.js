const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types if needed (e.g., database errors)
  // if (err.code === 'ER_DUP_ENTRY') {
  //   statusCode = 409; // Conflict
  //   message = 'Duplicate entry';
  // }

  res.status(statusCode).json({
    message: message,
    // Optionally include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
