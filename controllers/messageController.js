const Message = require("../models/messageModel");

const getMessages = (req, res) => {
  const user = req.params.id;
  res.json({ message: "Created a message" });
};

const createMessage = async (req, res) => {
  // get message and user from request body
  const { message, user } = req.body;

  // check if message or user isn't empty
  if (!message) {
    res.status(400).json({ message: "message field cannot be empty" });
  } else if (!user) {
    res.status(400).json({ message: "user cannot be empty" });
  }

  // check if user exists

  // add message to database
  const data = new Message({
    message,
    user,
  });

  data
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = { getMessages, createMessage };
