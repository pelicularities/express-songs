const express = require("express");
const router = express.Router();

// DATA
const movies = [];

// PARAM CALLBACKS
router.param("movieId", (req, res, next, movieId) => {
  req.movie = movies.find((movie) => movie.id === parseInt(movieId));
  req.movieIndex = movies.indexOf(req.movie);
  next();
});

// ROUTES
router.get("/", (req, res) => {
  res.status(200).json(movies);
});

router.get("/:movieId", (req, res) => {
  res.status(200).json(req.movie);
});

router.post("/", (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    ...req.body,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

router.put("/:movieId", (req, res) => {
  movies[req.movieIndex] = {
    id: req.movie.id,
    ...req.body,
  };
  res.status(200).json(movies[req.movieIndex]);
});

router.delete("/:movieId", (req, res) => {
  movies.splice(req.movieIndex, 1);
  res.status(200).json(req.movie);
});

module.exports = router;
