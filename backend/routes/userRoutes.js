
const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  createUser,
  updateMyProfile,
  getAllUsers,
  updateUserStatus,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/me", protect, getMyProfile);
router.patch("/me", protect, updateMyProfile);

router.post("/", protect, authorizeRoles("admin"), createUser);

router.get(
  "/",
  protect,
  authorizeRoles("admin", "supervisor"),
  getAllUsers
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateUserStatus
);

module.exports = router;
