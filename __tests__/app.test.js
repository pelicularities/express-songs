const request = require("supertest");
const app = require("../app");
const dbHandlers = require("../test/dbHandler");

describe("App", () => {
  beforeAll(async () => {
    await dbHandlers.connect();
  });

  afterEach(async () => {
    await dbHandlers.clearDatabase();
  });
  afterAll(async () => await dbHandlers.closeDatabase());
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
