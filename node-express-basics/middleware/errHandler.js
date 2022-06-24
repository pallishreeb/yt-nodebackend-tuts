//error handling middleware
function errorHandler(error, req, res, next) {
  if (error) {
    res.status(error.status || 500).json({
      error: {
        message: error.message || "Something went wrong in application...",
      },
    });
  }
}

module.exports = errorHandler;
