require("../utils/db");

const express = require("express");
const router = express.Router();

const Song = require("../models/song.model");

// ROUTES
router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
});

router.get("/:songId", async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (error) {
    next(error);
  }
});

router.put("/:songId", async (req, res, next) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.songId,
      req.body,
      { new: true }
    );
    if (!updatedSong) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    next(error);
  }
});

router.delete("/:songId", async (req, res, next) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.songId);
    res.status(200).json(deletedSong);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
