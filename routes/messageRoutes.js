const express = require("express");
const messagesRouter = express.Router();
const {
  getMessages,
  createMessage,
} = require("../controllers/messageController");

messagesRouter.get("/", getMessages);

messagesRouter.post("/", createMessage);

module.exports = messagesRouter;
