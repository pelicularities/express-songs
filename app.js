const express = require("express");
const app = express();
app.use(express.json());

// MIDDLEWARE
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

// ROUTERS
const songsRouter = require("./routes/songs.routes");
const moviesRouter = require("./routes/movies.routes");

app.use("/songs", songsRouter);
app.use("/movies", moviesRouter);

// ROUTES - ROOT
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

// ROUTES - USERS
app.post("/users", (req, res) => {
  res.send(
    `You would like to create a user with username ${req.body.username}`
  );
});

module.exports = app;
