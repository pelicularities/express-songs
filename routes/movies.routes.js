const express = require("express");
const router = express.Router();
const Joi = require("joi");

// SCHEMA AND VALIDATION
const validateMovie = (movie) => {
  const schema = Joi.object({
    id: Joi.number().integer(),
    movieName: Joi.string().required(),
  });
  return schema.validate(movie);
};

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

router.post("/", (req, res, next) => {
  const newMovie = {
    id: movies.length + 1,
    ...req.body,
  };
  const validation = validateMovie(newMovie);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  }
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

router.put("/:movieId", (req, res) => {
  const updatedMovie = {
    id: req.movie.id,
    ...req.body,
  };
  const validation = validateMovie(updatedMovie);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  }
  movies[req.movieIndex] = updatedMovie;
  res.status(200).json(movies[req.movieIndex]);
});

router.delete("/:movieId", (req, res) => {
  movies.splice(req.movieIndex, 1);
  res.status(200).json(req.movie);
});

module.exports = router;
