const express = require("express");
const router = express.Router();
const Joi = require("joi");

// SCHEMA AND VALIDATION
const validateSong = (song) => {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().required(),
    artist: Joi.string().required(),
  });
  return schema.validate(song);
};

// DATA
const songs = [
  {
    id: 1,
    name: "My Way",
    artist: "Frank Sinatra",
  },
  {
    id: 2,
    name: "Starlight Express",
    artist: "Andrew Lloyd Webber",
  },
  {
    id: 3,
    name: "Doesn't know this ditty",
    artist: "Sinatra",
  },
];

// PARAM CALLBACKS
router.param("songId", (req, res, next, songId) => {
  req.song = songs.find((song) => song.id === parseInt(songId));
  req.songIndex = songs.indexOf(req.song);
  next();
});

// ROUTES
router.get("/", (req, res) => {
  res.status(200).json(songs);
});

router.get("/:songId", (req, res) => {
  res.status(200).json(req.song);
});

router.post("/", (req, res, next) => {
  const newSong = {
    id: songs.length + 1,
    ...req.body,
  };
  const validation = validateSong(newSong);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  }
  songs.push(newSong);
  res.status(201).json(newSong);
});

router.put("/:songId", (req, res, next) => {
  const updatedSong = {
    id: req.song.id,
    ...req.body,
  };
  const validation = validateSong(updatedSong);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  } else {
    songs[req.songIndex] = updatedSong;
    res.status(200).json(songs[req.songIndex]);
  }
});

router.delete("/:songId", (req, res) => {
  songs.splice(req.songIndex, 1);
  res.status(200).json(req.song);
});

module.exports = router;
