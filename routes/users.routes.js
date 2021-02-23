const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send(
    `You would like to create a user with username ${req.body.username}`
  );
});

module.exports = router;
