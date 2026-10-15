require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");

async function createAdmin() {
  const { BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_NAME, BOOTSTRAP_ADMIN_PASSWORD, MONGO_URI } = process.env;

  if (!MONGO_URI || !BOOTSTRAP_ADMIN_EMAIL || !BOOTSTRAP_ADMIN_NAME || !BOOTSTRAP_ADMIN_PASSWORD) {
    throw new Error("Set MONGO_URI, BOOTSTRAP_ADMIN_EMAIL, BOOTSTRAP_ADMIN_NAME, and BOOTSTRAP_ADMIN_PASSWORD.");
  }
  if (BOOTSTRAP_ADMIN_PASSWORD.length < 8) {
    throw new Error("BOOTSTRAP_ADMIN_PASSWORD must be at least 8 characters.");
  }

  await mongoose.connect(MONGO_URI);
  const email = BOOTSTRAP_ADMIN_EMAIL.trim().toLowerCase();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.role === "admin") {
      console.log("The configured account is already an admin.");
      return;
    }
    throw new Error("The configured email belongs to a non-admin account; no role was changed.");
  }

  await User.create({
    name: BOOTSTRAP_ADMIN_NAME.trim(),
    email,
    password: await bcrypt.hash(BOOTSTRAP_ADMIN_PASSWORD, 12),
    role: "admin",
  });
  console.log("Admin account created.");
}

createAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());