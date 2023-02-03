const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.log("Error Connecting to server");
    } else {
      console.log(error);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
