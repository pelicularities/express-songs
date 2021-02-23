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

const movies = [];

// MIDDLEWARE
const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json");
  } else {
    next();
  }
};

app.post("/*", requireJsonContent, (req, res, next) => {
  // console.log("app-level POST method middleware!");
  next();
});

// app.use((req, res, next) => {
//   console.log("App-level middleware!");
//   next();
// });

// app.use("/users", (req, res, next) => {
//   console.log("/users level middleware!");
//   next();
// });

// app.use("/songs", (req, res, next) => {
//   console.log("/songs level middleware!");
//   next();
// });

// PARAM CALLBACKS
app.param("songId", (req, res, next, songId) => {
  const song = songs.find((song) => song.id === parseInt(songId));
  const songIndex = songs.indexOf(song);
  req.song = song;
  req.songIndex = songIndex;
  next();
});

app.param("movieId", (req, res, next, movieId) => {
  const movie = movies.find((movie) => movie.id === parseInt(movieId));
  const movieIndex = movies.indexOf(movie);
  req.movie = movie;
  req.movieIndex = movieIndex;
  next();
});

// ROUTES - ROOT
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

// ROUTES - SONGS
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

// ROUTES - MOVIES
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:movieId", (req, res) => {
  res.status(200).json(req.movie);
});

app.post("/movies", (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    ...req.body,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put("/movies/:movieId", (req, res) => {
  movies[req.movieIndex] = {
    id: req.movie.id,
    ...req.body,
  };
  console.log(movies);
  res.status(200).json(movies[req.movieIndex]);
});

app.delete("/movies/:movieId", (req, res) => {
  movies.splice(req.movieIndex, 1);
  res.status(200).json(req.movie);
});

// ROUTES - USERS

app.post("/users", (req, res) => {
  res.send(
    `You would like to create a user with username ${req.body.username}`
  );
});

module.exports = app;
