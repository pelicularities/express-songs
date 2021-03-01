require("../utils/db");

const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs.controller");

// ROUTES
router.get("/", async (req, res, next) => {
  const songs = await songsController.findAll(next);
  res.status(200).json(songs);
});

router.get("/:songName", async (req, res, next) => {
  const song = await songsController.findOne(req.params.songName, next);
  res.status(200).json(song);
});

router.post("/", async (req, res, next) => {
  const newSong = await songsController.createOne(req.body, next);
  res.status(201).json(newSong);
});

router.put("/:songName", async (req, res, next) => {
  const updatedSong = await songsController.updateOne(
    req.params.songName,
    req.body,
    next
  );
  res.status(200).json(updatedSong);
});

router.delete("/:songName", async (req, res, next) => {
  const deletedSong = await songsController.deleteOne(
    req.params.songName,
    next
  );
  res.status(200).json(deletedSong);
});

module.exports = router;
