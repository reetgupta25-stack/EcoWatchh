
const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  getAllUsers,
  updateUserStatus,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/me", protect, getMyProfile);

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateUserStatus
);

module.exports = router;
