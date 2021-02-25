require("./utils/db");
const Song = require("./models/song.model");

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

app.use("/songs", songsRouter);
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

// ERROR HANDLERS
app.use((err, req, res, next) => {
  console.log(err);
  res.send(
    `Error ${err.statusCode}: ${err.message}.\nWhat on earth did you send?`
  );
});

module.exports = app;
