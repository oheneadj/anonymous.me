const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.json({ message: "user logged in" });
};

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  res.json({ message: "user registered" });
};

const resetUserPassword = (req, res) => {
  res.json({ message: "User password as been reset" });
};

module.exports = { loginUser, registerUser, resetUserPassword };
