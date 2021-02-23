const request = require("supertest");
const app = require("../app");

describe("App", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });

  it("should respond correctly to a GET request", async () => {
    const { text } = await request(app).get("/").expect(200);
    expect(text).toEqual("Hello World");
  });

  it("should respond correctly to a POST request with valid JSON", async () => {
    const { text } = await request(app)
      .post("/")
      .send({ thisIsJson: "heyooo!" })
      .expect(201);
    expect(text).toEqual("Thanks for the JSON!");
  });

  it("should respond correctly to a POST request without JSON", async () => {
    const { text } = await request(app).post("/").send("not json").expect(400);
    expect(text).toEqual("Server wants application/json");
  });
});

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

  it("should respond correctly to a PUT request", async () => {
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

  it("should respond correctly to a DELETE request", async () => {
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

describe("/movies", () => {
  it("should respond correctly to a POST request", async () => {
    const movie = { movieName: "Lion King" };
    const { body: actualMovie } = await request(app)
      .post("/movies")
      .send(movie)
      .expect(201);
    expect(actualMovie).toMatchObject(movie);
  });
  it("should respond correctly to a GET request", async () => {
    const expectedResult = [
      {
        id: 1,
        movieName: "Lion King",
      },
    ];
    const response = await request(app).get("/movies").expect(200);
    expect(response.body).toEqual(expectedResult);
  });
});
