const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generator = require("generate-password");
const sendMail = require("../config/email");

/**
 * ? Method: Login User
 **/
const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(200).redirect("/register");
};

/**
 *  ? Method: Create new user
 **/
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).redirect("/register");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create name
  const name = `${firstname} ${lastname}`;

  // Generate username
  const random = Math.floor(Math.random() * 100);
  const username =
    firstname.trim().toLowerCase() +
    lastname.trim().toLowerCase().slice(0, 2) +
    random;

  // Save user in database
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  // Return user object if user created successfully
  if (user) {
    res.status(302).redirect("/mymessages");
  } else {
    res.status(302).redirect("/register");
  }
});

/**
 * ? Method: Reset password
 **/

const resetUserPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(302).redirect("/reset-password");
  }

  // Generate random password
  const password = generator.generate({
    length: 8,
    number: true,
  });

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update user password
  const updatedUser = await User.findOneAndUpdate({ email, hashedPassword });
  if (updatedUser) {
    const mailSent = sendMail(
      email,
      "New Password from Anonymous",
      `This is your new password. Please keep it safe! password : ${password}`
    );
    if (mailSent !== "false") res.status(200).redirect("/login");
  } else {
    res.status(500).redirect("/reset-password");
  }
});

module.exports = { loginUser, registerUser, resetUserPassword };
