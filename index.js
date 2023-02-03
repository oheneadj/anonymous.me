const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const pagesRouter = require("./routes/pageRoutes");
const messagesRouter = require("./routes/messageRoutes");
const authRouter = require("./routes/authRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// Database Connection
connectDB();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(errorHandler);

// register ejs view engine
app.set("view engine", "ejs");

// Routes
app.use("/", pagesRouter);
app.use("/message/", messagesRouter);
app.use("/auth/", authRouter);

// listen for requests
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
