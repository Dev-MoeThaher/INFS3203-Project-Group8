require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/services/geminiService", () => ({
  generateItinerary: jest.fn().mockResolvedValue("sample itinerary text"),
  generatePacking: jest.fn().mockResolvedValue("sample packing text")
}));

describe("AI endpoints", () => {
  test("POST /api/ai/itinerary returns generated itinerary", async () => {
    const response = await request(app)
      .post("/api/ai/itinerary")
      .send({ destination: "Istanbul", days: 3, preferences: "food" });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBe("sample itinerary text");
  });

  test("POST /api/ai/packing returns generated packing list", async () => {
    const response = await request(app)
      .post("/api/ai/packing")
      .send({ destination: "Istanbul", days: 3, preferences: "food" });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBe("sample packing text");
  });

  test("POST /api/ai/itinerary returns 400 when missing fields", async () => {
    const response = await request(app)
      .post("/api/ai/itinerary")
      .send({ destination: "", days: null });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
