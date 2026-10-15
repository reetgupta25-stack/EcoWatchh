
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header
      if (!origin) {
        return callback(null, true);
      }

      // Allow configured frontend URLs
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost during development only
      const isLocalhost =
        process.env.NODE_ENV !== "production" &&
        allowedOrigins.length === 0 &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (isLocalhost) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS."));
    },
  })
);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    server: "running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(
        `Health check: http://localhost:${PORT}/api/health`
      );
    });

    server.on("error", (error) => {
      console.error("HTTP server error:", error.message);
      process.exitCode = 1;
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  }
}

// Do not start the server when imported by tests
if (require.main === module) {
  startServer();
}

module.exports = app;
