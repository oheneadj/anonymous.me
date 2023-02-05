const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const Router = require("./routes/Routes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const session = require("express-session");

const store = require("./models/sessionModel");
// Database Connection
connectDB();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(errorHandler);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// register ejs view engine
app.set("view engine", "ejs");

// Routes
app.use("/", Router);
app.use((req, res) => {
  res.render("404", { title: "Page not found" });
});

// listen for requests
app.listen(() => console.log(`Server running on PORT`));
