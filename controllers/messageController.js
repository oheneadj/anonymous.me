const Message = require("../models/messageModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

/**
 *Method: Get Messages
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
 *Method: Create a new message
 *
 **/

const createMessage = asyncHandler(async (req, res) => {
  // get message and user from request body
  const { message, user } = req.body;

  // check if message or user isn't empty
  if (!message) {
    res.status(400);
    throw new Error("Message field cannot be empty");
  } else if (!user) {
    res.status(400);
    throw new Error("User field cannot be empty");
  }

  // check if user exists
  const userExists = await User.findOne({ id: user });
  // add message to database

  if (userExists) {
    const data = await Message.create({
      message,
      user,
    });
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error("Cannot find user");
  }
});

module.exports = { getMessages, createMessage };
