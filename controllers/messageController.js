const Message = require("../models/messageModel");
const User = require("../models/userModel");

const getMessages = async (req, res) => {
  const user = req.body.user;

  const messages = await Message.find({ user: user});

  if(messages){
    res.json(messages);
  }else{
    res.json({messages:"Messages not found"});
  }
  
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
    const userExists = await User.findOne({ id: user});
  // add message to database
  if(userExists){
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
  }else {
    res.status(400).json({ message: "Cannot find user" });
  }
};

module.exports = { getMessages, createMessage };
