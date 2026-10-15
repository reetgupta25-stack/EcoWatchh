
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const allowedRoles = ["citizen", "admin", "supervisor", "worker"];

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !/^\S+@\S+\.\S+$/.test(email.trim()) ||
      password.length < 8 ||
      !allowedRoles.includes(role)
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, valid email, role, and password (at least 8 characters) are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ success: false, message: "Email is already registered." });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      !name.trim() ||
      !/^\S+@\S+\.\S+$/.test(email.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "A name and valid email address are required.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim(), email: email.trim().toLowerCase() },
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filter = {};
    const { role } = req.query;

    if (role && ["citizen", "admin", "supervisor", "worker"].includes(role)) {
      filter.role = role;
    }

    if (req.user.role === "supervisor") {
      filter.role = "worker";
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User status updated.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserStatus,
};
