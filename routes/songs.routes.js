require("../utils/db");

const express = require("express");
const router = express.Router();
// const Joi = require("joi");

const Song = require("../models/song.model");

// SCHEMA AND VALIDATION
// const validateSong = (song) => {
//   const schema = Joi.object({
//     id: Joi.number().integer(),
//     name: Joi.string().required(),
//     artist: Joi.string().required(),
//   });
//   return schema.validate(song);
// };

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
  try {
    req.song = await Song.findById(songId);
    next();
  } catch (error) {
    next(error);
  }
});

// ROUTES
router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
});

router.get("/:songId", (req, res) => {
  res.status(200).json(req.song);
});

router.post("/", async (req, res, next) => {
  // const validation = validateSong(req.body);
  // if (validation.error) {
  //   const error = new Error(validation.error.details[0].message);
  //   error.statusCode = 400;
  //   next(error);
  // }
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (error) {
    next(error);
  }
});

router.put("/:songId", async (req, res, next) => {
  try {
    const updatedSong = await Song.findOneAndUpdate(
      { _id: req.params.songId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSong);
  } catch (error) {
    next(error);
  }
  // const validation = validateSong(updatedSong);
  // if (validation.error) {
  //   const error = new Error(validation.error.details[0].message);
  //   error.statusCode = 400;
  //   next(error);
  // } else {
  //   songs[req.songIndex] = updatedSong;
  //   res.status(200).json(songs[req.songIndex]);
  // }
});

router.delete("/:songId", async (req, res, next) => {
  try {
    const deletedSong = await Song.findOneAndDelete({ _id: req.params.songId });
    res.status(200).json(deletedSong);
  } catch (error) {
    next(error);
  }
  // songs.splice(req.songIndex, 1);
  // res.status(200).json(req.song);
});

module.exports = router;
