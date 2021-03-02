const request = require("supertest");
const app = require("../app");
const Song = require("../models/song.model");
const dbHandlers = require("../test/dbHandler");
const createJWTToken = require("../config/jwt");

describe("/songs", () => {
  let token;
  beforeAll(async () => {
    await dbHandlers.connect();
    token = createJWTToken("yoloauth");
  });

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

  describe("GET", () => {
    it("should respond correctly to /songs", async () => {
      const { body } = await request(app).get("/songs").expect(200);
      expect(body.length).toBeGreaterThanOrEqual(3);
    });

    it("should respond correctly to /songs/:songName", async () => {
      const { body } = await request(app).get("/songs/My Way").expect(200);
      expect(body).toMatchObject({
        name: "My Way",
        artist: "Frank Sinatra",
      });
    });
  });

  describe("POST", () => {
    it("should respond correctly to /songs", async () => {
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
  });

  describe("PUT", () => {
    it("should throw error if unauthorized", async () => {
      const updatedSong = {
        name: "Fly Me To The Moon",
        artist: "Frank Sinatra",
      };
      await request(app).put("/songs/My Way").send(updatedSong).expect(401);
    });

    it("should modify correct song if authorised and given valid song name", async () => {
      const updatedSong = {
        name: "Fly Me To The Moon",
        artist: "Frank Sinatra",
      };
      const { body: actualSong } = await request(app)
        .put("/songs/My Way")
        .send(updatedSong)
        .set("Cookie", `token=${token}`)
        .expect(200);
      expect(actualSong).toMatchObject(updatedSong);
    });
  });

  describe("DELETE", () => {
    it("should throw error if unauthorised", async () => {
      await request(app).delete("/songs/My Way").expect(401);
    });

    it("should delete correct song if authorised and given valid song name", async () => {
      const deletedSong = {
        name: "My Way",
        artist: "Frank Sinatra",
      };
      const { body: actualSong } = await request(app)
        .delete("/songs/My Way")
        .set("Cookie", `token=${token}`)
        .expect(200);
      expect(actualSong).toMatchObject(deletedSong);
      const { body: allSongs } = await request(app).get("/songs").expect(200);
      expect(allSongs.length).toEqual(2);
    });
  });
});
