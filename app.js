// EXTERNAL IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");

// INTERNAL IMPORTS
require("dotenv").config();

// APP SETUP AND EXTERNAL MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cookieParser());

// INTERNAL MIDDLEWARE
const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json");
  } else {
    next();
  }
};

app.post("/*", requireJsonContent, (req, res, next) => {
  next();
});

// ROUTES - ROOT
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

// ROUTERS
const songsRouter = require("./routes/songs.routes");
const moviesRouter = require("./routes/movies.routes");
const usersRouter = require("./routes/users.routes");
const loginRouter = require("./routes/login.routes");

app.use("/songs", songsRouter);
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/", loginRouter);

// ERROR HANDLERS
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(`Error ${err.statusCode}: ${err.message}`);
});

module.exports = app;
