require("dotenv").config();
require("./utils/db");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const createJWTToken = require("./config/jwt");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();
app.use(cookieParser());
app.use(express.json());

// MIDDLEWARE
const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json");
  } else {
    next();
  }
};

app.post("/*", requireJsonContent, (req, res, next) => {
  next();
});

// ROUTES - ROOT
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  res.status(201).send("Thanks for the JSON!");
});

// ROUTES - LOGIN / LOGOUT
app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(user.username);

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    res.cookie("token", token, {
      // you are setting the cookie here, and the name of your cookie is `token`
      expires: expiryDate,
      httpOnly: true, // client-side js cannot access cookie info
      secure: true, // use HTTPS
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});

// ROUTERS
const songsRouter = require("./routes/songs.routes");
const moviesRouter = require("./routes/movies.routes");
const usersRouter = require("./routes/users.routes");

app.use("/songs", songsRouter);
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);

// ERROR HANDLERS
app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  res
    .status(err.statusCode)
    .send(
      `Error ${err.statusCode}: ${err.message}\nWhat on earth did you send?`
    );
});

module.exports = app;
