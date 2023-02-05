const express = require("express");
const Router = express.Router();
const {
  loginUser,
  registerUser,
  resetUserPassword,
  getMessages,
  createMessage,
} = require("../controllers/Controller");
const asyncHandler = require("express-async-handler");
const { notLoggedIn, isAuth } = require("../config/session");
const Messages = require("../models/messageModel");

//? PAGES Routes
Router.get("/", (req, res) => {
  res.render("index", { title: "Send Anomymously" });
});

Router.get("/login", notLoggedIn, (req, res) => {
  res.render("login", { title: "Login" });
});

Router.get("/register", notLoggedIn, (req, res) => {
  res.render("register", { title: "Register" });
});

Router.get("/reset-password", notLoggedIn, (req, res) => {
  res.render("reset-password", { title: "Reset-Password" });
});

Router.get(
  "/mymessages",
  isAuth,
  asyncHandler(async (req, res) => {
    // get all blogs based on logged in user in session
    const messages = await Messages.find({ user: req.session.user.id });

    console.log(messages);
    res.render("messages", {
      title: "Message",
      messages,
      name: req.session.user.name,
      link: req.session.user.link,
    });
  })
);

Router.get("/share", isAuth, (req, res) => {
  res.render("share", { title: "Share Links" });
});

Router.get("/message/:id", (req, res) => {
  res.render("send-message", { title: "Send Message" });
});
Router.get("/success", (req, res) => {
  res.render("success", { title: "Message Sent" });
});

//? API Routes
Router.post("/login", loginUser);

Router.post("/register", registerUser);

Router.post("/reset-password", resetUserPassword);

Router.post("/message", createMessage);

module.exports = Router;
