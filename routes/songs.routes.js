const express = require("express");
const router = express.Router();

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

router.post("/", (req, res) => {
  const newSong = {
    id: songs.length + 1,
    ...req.body,
  };
  songs.push(newSong);
  res.status(201).json(newSong);
});

router.put("/:songId", (req, res) => {
  songs[req.songIndex] = {
    id: req.song.id,
    ...req.body,
  };
  res.status(200).json(songs[req.songIndex]);
});

router.delete("/:songId", (req, res) => {
  songs.splice(req.songIndex, 1);
  res.status(200).json(req.song);
});

module.exports = router;
