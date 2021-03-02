/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../app");
const dbHandlers = require("../test/dbHandler");
const mongoose = require("mongoose");

describe("/users", () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await dbHandlers.connect();
  });

  afterEach(async () => {
    await dbHandlers.clearDatabase();
  });
  afterAll(async () => await dbHandlers.closeDatabase());

  it("should respond correctly to a POST request", async () => {
    const response = await request(app)
      .post("/users")
      .send({ username: "YOLO!" })
      .expect(422);
  });
});
