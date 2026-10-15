
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (err, _req, res, _next) => {
  let statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  let message = err.message || "Internal Server Error";

  if (err.status >= 400 && err.status < 500) {
    statusCode = err.status;
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "A record with that value already exists.";
  }

  if (statusCode === 500) {
    console.error(err);
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
