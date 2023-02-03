const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Please add a message value"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
  },
  { timestamp: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
