/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../app");
const Song = require("../models/song.model");
// const { teardownMongoose } = require("../test/mongoose");
const dbHandlers = require("../test/dbHandler");

describe("/songs", () => {
  beforeAll(async () => await dbHandlers.connect());

  beforeEach(async () => {
    const songData = [
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
        artist: "Frank Sinatra",
      },
    ];
    await Song.create(songData);
  });
  afterEach(async () => {
    await dbHandlers.clearDatabase();
  });
  afterAll(async () => await dbHandlers.closeDatabase());

  it("should respond correctly to a GET request", async () => {
    const { body } = await request(app).get("/songs").expect(200);
    expect(body.length).toBeGreaterThanOrEqual(3);
  });

  it("should respond correctly to a GET request with song name", async () => {
    const { body } = await request(app).get("/songs/My Way").expect(200);
    expect(body).toMatchObject({
      name: "My Way",
      artist: "Frank Sinatra",
    });
  });

  it("should respond correctly to a POST request", async () => {
    const song = {
      name: "Anything Goes",
      artist: "Frank Sinatra",
    };
    const { body: actualSong } = await request(app)
      .post("/songs")
      .send(song)
      .expect(201);
    expect(actualSong).toMatchObject(song);
  });

  it("should respond correctly to a PUT request with song name", async () => {
    const updatedSong = {
      name: "Fly Me To The Moon",
      artist: "Frank Sinatra",
    };
    const { body: actualSong } = await request(app)
      .put("/songs/My Way")
      .send(updatedSong)
      .expect(200);
    expect(actualSong).toMatchObject(updatedSong);
  });

  it("should respond correctly to a DELETE request with song name", async () => {
    const deletedSong = {
      name: "My Way",
      artist: "Frank Sinatra",
    };
    const { body: actualSong } = await request(app)
      .delete("/songs/My Way")
      .expect(200);
    expect(actualSong).toMatchObject(deletedSong);
    const { body: allSongs } = await request(app).get("/songs").expect(200);
    expect(allSongs.length).toEqual(2);
  });
});
