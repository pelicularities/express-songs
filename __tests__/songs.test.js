const request = require("supertest");
const app = require("../app");
describe("/songs", () => {
  it("should respond correctly to a GET request", async () => {
    const { body } = await request(app).get("/songs").expect(200);
    expect(body).toEqual([
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
    ]);
  });

  it("should respond correctly to a GET request with song ID", async () => {
    const { body } = await request(app).get("/songs/1").expect(200);
    expect(body).toEqual({
      id: 1,
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

  it("should respond correctly to a PUT request with song ID", async () => {
    const updatedSong = {
      name: "Fly Me To The Moon",
      artist: "Frank Sinatra",
    };
    const response = await request(app)
      .put("/songs/1")
      .send(updatedSong)
      .expect(200);
    expect(response.body).toMatchObject(updatedSong);
  });

  it("should respond correctly to a DELETE request with song ID", async () => {
    const deletedSong = {
      id: 1,
      name: "Fly Me To The Moon",
      artist: "Frank Sinatra",
    };
    const { body: actualSong } = await request(app)
      .delete("/songs/1")
      .expect(200);
    expect(actualSong).toMatchObject(deletedSong);
    const { body: allSongs } = await request(app).get("/songs").expect(200);
    expect(allSongs.length).toEqual(3);
  });
});
