const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  test("It should home access", async (done) => {
    request(app)
      .get("/api/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
