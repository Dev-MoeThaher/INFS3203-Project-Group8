require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Trip = require("../src/models/Trip");

describe("Trip API endpoints", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    beforeEach(async () => {
        await Trip.deleteMany({});
    });

    afterAll(async () => {
        await Trip.deleteMany({});
        await mongoose.connection.close();
    });

    test("POST /api/trips should create a new trip", async () => {
        const response = await request(app)
            .post("/api/trips")
            .send({
                destination: "Istanbul",
                startDate: "2026-04-20",
                endDate: "2026-04-25",
                preferences: "food, history, shopping"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.destination).toBe("Istanbul");
        expect(response.body.data.status).toBe("draft");
    });

    test("GET /api/trips should return all trips", async () => {
        await Trip.create({
            destination: "Doha",
            startDate: "2026-05-01",
            endDate: "2026-05-03",
            preferences: "relaxing, cafes"
        });

        const response = await request(app).get("/api/trips");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.count).toBe(1);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].destination).toBe("Doha");
    });

    test("GET /api/trips/:id should return one trip", async () => {
        const trip = await Trip.create({
            destination: "Paris",
            startDate: "2026-06-10",
            endDate: "2026-06-15",
            preferences: "museums, food"
        });

        const response = await request(app).get(`/api/trips/${trip._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.destination).toBe("Paris");
    });

    test("PUT /api/trips/:id should update a trip", async () => {
        const trip = await Trip.create({
            destination: "Rome",
            startDate: "2026-07-01",
            endDate: "2026-07-05",
            preferences: "history"
        });

        const response = await request(app)
            .put(`/api/trips/${trip._id}`)
            .send({
                preferences: "history, food",
                status: "generated"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.preferences).toBe("history, food");
        expect(response.body.data.status).toBe("generated");
    });

    test("DELETE /api/trips/:id should delete a trip", async () => {
        const trip = await Trip.create({
            destination: "Tokyo",
            startDate: "2026-08-01",
            endDate: "2026-08-07",
            preferences: "shopping"
        });

        const response = await request(app).delete(`/api/trips/${trip._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Trip deleted successfully");
    });

    test("POST /api/trips should return 400 when required fields are missing", async () => {
        const response = await request(app)
            .post("/api/trips")
            .send({
                destination: "",
                startDate: "",
                endDate: ""
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test("GET /api/trips/:id should return 400 for invalid ID", async () => {
        const response = await request(app).get("/api/trips/123");

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid resource ID");
    });
});