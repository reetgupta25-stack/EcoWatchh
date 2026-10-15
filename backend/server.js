
const PORT = process.env.PORT || 5000;

async function startServer() {
  // Start HTTP server first so Render can detect the port.
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Health check: /api/health`);

    // Connect to MongoDB after the server starts.
    connectDB()
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
      });
  });

  server.on("error", (error) => {
    console.error("HTTP server error:", error.message);
  });

  return server;
}

// Do not start the server when imported by tests.
if (require.main === module) {
  startServer();
}

module.exports = app;
