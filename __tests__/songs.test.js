/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../app");
describe("/songs", () => {
  it("should respond correctly to a GET request", async () => {
    const { body } = await request(app).get("/songs").expect(200);
    expect(body.length).toBeGreaterThanOrEqual(3);
  });

  xit("should respond correctly to a GET request with song ID", async () => {
    const { body } = await request(app).get("/songs/1").expect(200);
    expect(body).toMatchObject({
      name: "My Way",
      artist: "Frank Sinatra",
    });
  });

  xit("should respond correctly to a POST request", async () => {
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

  xit("should respond correctly to a PUT request with song ID", async () => {
    const updatedSong = {
      name: "Fly Me To The Moon",
      artist: "Frank Sinatra",
    };
    const { body: actualSong } = await request(app)
      .put("/songs/1")
      .send(updatedSong)
      .expect(200);
    expect(actualSong).toMatchObject(updatedSong);
  });

  xit("should respond correctly to a DELETE request with song ID", async () => {
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
