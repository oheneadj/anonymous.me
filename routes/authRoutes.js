const express = require("express");
const authRoutes = express.Router();
const {
  loginUser,
  registerUser,
  resetUserPassword,
} = require("../controllers/authController");

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/reset-password", resetUserPassword);

module.exports = authRoutes;
