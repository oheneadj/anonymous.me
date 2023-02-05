const User = require("../models/userModel");
const Message = require("../models/messageModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generator = require("generate-password");
const sendMail = require("../config/email");

/**
 * ? Method: Login User
 **/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(email);

  if (!user) {
    res.redirect("/login");
  }

  const passIsMatch = await bcrypt.compare(password, user.password);

  if (!passIsMatch) {
    res.redirect("/login");
  }

  req.session.isAuth = true;
  req.session.user = {
    id: user._id,
    name: user.name,
    link: `${req.protocol}://${req.headers.host}/message/${user.username}`,
  };
  res.status(200).redirect("/mymessages");
});

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
    res.status(302).redirect("/login");
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

/**
 * ? Method: Get Messages
 *
 **/
const getMessages = asyncHandler(async (req, res) => {
  // get user from request parameters
  const user = req.body.user;

  // find messages with user id
  try {
    const messages = await Message.find({ user: user });
    // check if user has messages
    if (messages) {
      res.status(200).json(messages);
    } else {
      res.status(404);
      throw new Error("No messages found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error getting messages" });
  }
});

/**
 * ? Method: Create a new message
 *
 **/

const createMessage = asyncHandler(async (req, res) => {
  // get message from request body
  const { message, username } = req.body;

  console.log(username);

  // check if message or user isn't empty
  if (!message) {
    res.status(400);
    throw new Error("Message field cannot be empty");
  } else if (!username) {
    res.status(400);
    throw new Error("User field cannot be empty");
  }

  // check if user exists
  const user = await User.findOne({ username: username });
  // add message to database

  if (user) {
    const data = await Message.create({
      message,
      user,
    });
    res.redirect("/success");
  } else {
    res.redirect("/404");
  }
});

module.exports = {
  loginUser,
  registerUser,
  resetUserPassword,
  getMessages,
  createMessage,
};
