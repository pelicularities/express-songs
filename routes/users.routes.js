const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    // instantiate new user instance
    const user = new User(req.body);

    // save user instance to DB
    const newUser = await user.save();

    res.status(200).send(newUser);
  } catch (err) {
    err.statusCode = 422;
    next(err);
  }
});

module.exports = router;
