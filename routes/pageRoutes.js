const express = require("express");
const pagesRouter = express.Router();

pagesRouter.get("/", (req, res) => {
  res.render("index", { title: "Send Anomymously" });
});

pagesRouter.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

pagesRouter.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

pagesRouter.get("/reset-password", (req, res) => {
  res.render("reset-password", { title: "Reset-Password" });
});

pagesRouter.get("/mymessages", (req, res) => {
  res.render("messages", { title: "Message" });
});

pagesRouter.get("/share", (req, res) => {
  res.render("share", { title: "Share Links" });
});

pagesRouter.get("/send-message/:id", (req, res) => {
  res.render("send-message", { title: "Send Message" });
});

module.exports = pagesRouter;
