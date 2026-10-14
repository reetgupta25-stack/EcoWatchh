
const express = require("express");
const router = express.Router();

const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// All issue routes require login
router.use(protect);

// Create a new issue
router.post("/", authorizeRoles("citizen"), createIssue);

// Get all issues
router.get("/", getIssues);

// Get a single issue by ID
router.get("/:id", getIssueById);

// Update an issue
router.patch(
  "/:id",
  authorizeRoles("citizen", "admin", "supervisor", "worker"),
  updateIssue
);

// Delete an issue (admin only)
router.delete("/:id", authorizeRoles("admin"), deleteIssue);

module.exports = router;
