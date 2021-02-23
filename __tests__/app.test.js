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

describe("Songs", () => {
  it("should respond correctly to a GET request to /songs endpoint", async () => {
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

  it("should respond correctly to a valid POST request to songs endpoint", async () => {
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

  it("should respond correctly to a POST request without JSON", async () => {
    const { text } = await request(app)
      .post("/songs")
      .send("not json")
      .expect(400);
    expect(text).toEqual("Server wants application/json");
  });
});

describe("Movies", () => {
  it("should respond correctly to a POST request with valid JSON", async () => {
    const movie = { movieName: "Lion King" };
    const { body: actualMovie } = await request(app)
      .post("/movies")
      .send(movie)
      .expect(201);
    expect(actualMovie).toMatchObject(movie);
  });
  it("should respond to a GET request with an array containing one movie", async () => {
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
