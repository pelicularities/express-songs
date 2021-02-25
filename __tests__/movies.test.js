/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../app");
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
    const { body: allMovies } = await request(app).get("/movies").expect(200);
    expect(allMovies).toEqual(expectedResult);
  });

  it("should respond correctly to a GET request with movie ID", async () => {
    const expectedResult = {
      id: 1,
      movieName: "Lion King",
    };
    const { body: actualMovie } = await request(app)
      .get("/movies/1")
      .expect(200);
    expect(actualMovie).toEqual(expectedResult);
  });

  it("should respond correctly to a PUT request with movie ID", async () => {
    const expectedResult = {
      movieName: "Frozen 2",
    };
    const { body: updatedMovie } = await request(app)
      .put("/movies/1")
      .send(expectedResult)
      .expect(200);
    expect(updatedMovie).toMatchObject(expectedResult);
  });
  it("should respond correctly to a DELETE request with movie ID", async () => {
    const expectedResult = {
      id: 1,
      movieName: "Frozen 2",
    };
    const { body: deletedMovie } = await request(app)
      .delete("/movies/1")
      .expect(200);
    expect(deletedMovie).toEqual(expectedResult);
    const { body: allMovies } = await request(app).get("/movies").expect(200);
    expect(allMovies.length).toEqual(0);
  });
});
