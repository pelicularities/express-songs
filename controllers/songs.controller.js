const Song = require("../models/song.model");

const findAll = async (next) => {
  try {
    return await Song.find({});
  } catch (error) {
    next(error);
  }
};

const findOne = async (name, next) => {
  try {
    const song = Song.findOne({ name: name });
    if (!song) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    return song;
  } catch (error) {
    next(error);
  }
};

const createOne = async (body, next) => {
  try {
    return await Song.create(body);
  } catch (error) {
    next(error);
  }
};

const updateOne = async (name, body, next) => {
  try {
    const updatedSong = await Song.findOneAndUpdate({ name: name }, body, {
      new: true,
    });
    if (!updatedSong) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    return updatedSong;
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (name, next) => {
  try {
    return await Song.findOneAndDelete({ name: name });
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, createOne, updateOne, deleteOne };
