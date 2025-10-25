import request from "supertest";
import { app, io } from "../src/index";
import { ROUTES } from "../src/routes";
import { SocketEvents } from "../src/types";
import { vi } from "vitest";

const validReading = {
  sensorId: "test-1",
  temperatureC: 21.5,
  humidityPct: 42,
  pressureHPa: 1013.2,
};

describe("Sensor API", () => {
  it("accepts a valid sensor reading", async () => {
    const res = await request(app)
      .post(ROUTES.SENSOR)
      .send(validReading)
      .expect(200);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("responds to healthcheck", async () => {
    const res = await request(app).get(ROUTES.HEALTHCHECK).expect(200);
    expect(res.text).toContain("Coldframe backend running");
  });

  it("rebroadcasts valid sensor data over WebSockets", async () => {
    const emitSpy = vi.spyOn(io, "emit");
    await request(app).post(ROUTES.SENSOR).send(validReading).expect(200);

    expect(emitSpy).toHaveBeenCalledWith(
      SocketEvents.SENSOR_UPDATE,
      expect.objectContaining(validReading)
    );

    emitSpy.mockRestore();
  });

  it("rejects invalid sensor data (missing fields)", async () => {
    const res = await request(app).post(ROUTES.SENSOR).send({}).expect(400);

    expect(res.body.error).toBe("Invalid sensor data");
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it("rejects invalid sensor data (wrong types)", async () => {
    const res = await request(app)
      .post(ROUTES.SENSOR)
      .send({ ...validReading, sensorId: 123 }) // sensorId should be a string
      .expect(400);

    expect(res.body.error).toBe("Invalid sensor data");
    expect(Array.isArray(res.body.details)).toBe(true);
    expect(res.body.details.length).toBeGreaterThan(0);
  });
});
