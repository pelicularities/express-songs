require("../utils/db");

const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Song = require("../models/song.model");

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
// const songs = [
//   {
//     id: 1,
//     name: "My Way",
//     artist: "Frank Sinatra",
//   },
//   {
//     id: 2,
//     name: "Starlight Express",
//     artist: "Andrew Lloyd Webber",
//   },
//   {
//     id: 3,
//     name: "Doesn't know this ditty",
//     artist: "Sinatra",
//   },
// ];

// PARAM CALLBACKS
router.param("songId", async (req, res, next, songId) => {
  req.song = await Song.findOne({ id: parseInt(songId) });
  next();
});

// ROUTES
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.status(200).json(songs);
});

router.get("/:songId", (req, res) => {
  res.status(200).json(req.song);
});

router.post("/", async (req, res, next) => {
  // don't ask...
  const nextId = (await Song.find().length) + 1;
  const newSong = {
    id: nextId,
    ...req.body,
  };
  const validation = validateSong(newSong);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 400;
    next(error);
  }
  // songs.push(newSong);
  await Song.create(newSong);
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
