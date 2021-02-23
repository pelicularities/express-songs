const express = require("express");
const app = express();
app.use(express.json());

const movies = [];

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

// PARAM CALLBACKS

app.param("movieId", (req, res, next, movieId) => {
  req.movie = movies.find((movie) => movie.id === parseInt(movieId));
  req.movieIndex = movies.indexOf(req.movie);
  next();
});

// ROUTERS
const songsRouter = require("./routes/songs.routes");
app.use("/songs", songsRouter);

// ROUTES - ROOT
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

// ROUTES - MOVIES
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:movieId", (req, res) => {
  res.status(200).json(req.movie);
});

app.post("/movies", (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    ...req.body,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put("/movies/:movieId", (req, res) => {
  movies[req.movieIndex] = {
    id: req.movie.id,
    ...req.body,
  };
  res.status(200).json(movies[req.movieIndex]);
});

app.delete("/movies/:movieId", (req, res) => {
  movies.splice(req.movieIndex, 1);
  res.status(200).json(req.movie);
});

// ROUTES - USERS
app.post("/users", (req, res) => {
  res.send(
    `You would like to create a user with username ${req.body.username}`
  );
});

module.exports = app;
