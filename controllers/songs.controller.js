const Song = require("../models/song.model");

const findAll = async (next) => {
  try {
    return await Song.find({});
  } catch (error) {
    next(error);
  }
};

const findOne = async (id, next) => {
  try {
    const song = Song.findById(id);
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

const updateOne = async (id, body, next) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(id, body, { new: true });
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

const deleteOne = async (id, next) => {
  try {
    return await Song.findByIdAndDelete(id);
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, findOne, createOne, updateOne, deleteOne };
