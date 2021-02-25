/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../app");

describe("/users", () => {
  it("should respond correctly to a POST request", async () => {
    const response = await request(app)
      .post("/users")
      .send({ username: "YOLO!" })
      .expect(200);
    expect(response.text).toEqual(
      "You would like to create a user with username YOLO!"
    );
  });
});