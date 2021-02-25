require("./utils/db");
const Song = require("./models/song.model");
const handleError = require("./utils/handleError");

const createSongsPromise = () => {
  return Song.create([
    {
      name: "My Way",
      artist: "Frank Sinatra",
    },
    {
      name: "Starlight Express",
      artist: "Andrew Lloyd Webber",
    },
    {
      name: "Doesn't know this ditty",
      artist: "Sinatra",
    },
  ]);
};

const isSongsEmpty = async () => {
  const songs = await Song.find();
  return songs.length === 0;
};

const seedSongs = async () => {
  try {
    if (await isSongsEmpty()) {
      await createSongsPromise();
      console.log("Seeded song data!");
    } else {
      console.log("Did not seed data: songs collection already seeded");
    }
  } catch (err) {
    console.log("Error seeding data... rolling back");
    await Song.deleteMany();
    console.error(err);
  }
};

seedSongs();
