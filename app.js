const express = require("express");
const app = express();
app.use(express.json());

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

// MIDDLEWARE
const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json");
  } else {
    next();
  }
};

app.use((req, res, next) => {
  console.log("App-level middleware!");
  next();
});

app.use("/users", (req, res, next) => {
  console.log("/users level middleware!");
  next();
});

app.use("/songs", (req, res, next) => {
  console.log("/songs level middleware!");
  next();
});

app.post("/songs", (req, res, next) => {
  console.log("/songs POST level middleware!");
  next();
});

// PARAM CALLBACKS
app.param("songId", (req, res, next, songId) => {
  const song = songs.find((song) => song.id === parseInt(songId));
  const songIndex = songs.indexOf(song);
  req.song = song;
  req.songIndex = songIndex;
  next();
});

// ROUTES
app.get("/songs", (req, res) => {
  res.status(200).json(songs);
});

app.get("/songs/:songId", (req, res) => {
  res.status(200).json(req.song);
});

app.post("/songs", (req, res) => {
  const newSong = {
    id: songs.length + 1,
    ...req.body,
  };
  songs.push(newSong);
  res.status(201).json(newSong);
});

app.put("/songs/:songId", (req, res) => {
  songs[req.songIndex] = {
    id: req.song.id,
    ...req.body,
  };
  res.status(200).json(songs[req.songIndex]);
});

app.delete("/songs/:songId", (req, res) => {
  songs.splice(req.songIndex, 1);
  res.status(200).json(req.song);
});

app.post("/users", requireJsonContent, (req, res) => {
  res.send(
    `You would like to create a user with username ${req.body.username}`
  );
});

module.exports = app;
