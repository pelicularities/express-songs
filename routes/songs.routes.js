// EXTERNAL IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// INTERNAL IMPORTS
const songsController = require("../controllers/songs.controller");

// APP SETUP AND EXTERNAL MIDDLEWARE
const router = express.Router();
router.use(cookieParser());

// INTERNAL MIDDLEWARE
const protectRoute = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      const err = new Error("You are not authorized");
      next(err);
    } else {
      req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

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

router.put("/:songName", protectRoute, async (req, res, next) => {
  const updatedSong = await songsController.updateOne(
    req.params.songName,
    req.body,
    next
  );
  res.status(200).json(updatedSong);
});

router.delete("/:songName", protectRoute, async (req, res, next) => {
  const deletedSong = await songsController.deleteOne(
    req.params.songName,
    next
  );
  res.status(200).json(deletedSong);
});

module.exports = router;
