const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: [true, "Song name is required"],
  },
  artist: {
    type: String,
    required: [true, "Artist name is required"],
  },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
