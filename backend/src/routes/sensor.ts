/**
 * Sensor Routes (HTTP + Socket.IO Layer)
 *
 * Responsibilities:
 * - Parse & validate incoming requests (via Zod).
 * - Enrich with timestamp if missing.
 * - Persist via SensorService.
 * - Emit updates over Socket.IO.
 *
 * All outgoing data (DB + Socket) conforms to SensorReading type.
 */

import { Router } from "express";
import { Server } from "socket.io";
import { SocketEvents, SensorReading, SensorReadingInput } from "@shared/types";
import { logger } from "../utils/logger";
import { SensorReadingSchema } from "../validation/sensorSchema";
import {
  handleNewReading,
  fetchRecentReadings,
} from "../services/sensorService";

export function sensorRoutes(io: Server) {
  const router = Router();

  // POST /sensor → persist + broadcast
  router.post("/", async (req, res) => {
    const parseResult = SensorReadingSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid sensor data",
        details: parseResult.error.issues,
      });
    }

    // parsed data conforms to SensorReadingInput
    const input: SensorReadingInput = parseResult.data;

    // Backend always ensures a timestamp exists
    const reading: SensorReading = {
      ...input,
      timestamp: input.timestamp ?? new Date().toISOString(),
    };

    try {
      // Persist reading (service handles DB)
      const saved = await handleNewReading(reading);

      // Log + emit the same object we store
      logger.info(reading, "Received sensor data");
      io.emit(SocketEvents.SENSOR_UPDATE, reading);

      return res.status(200).json(reading);
    } catch (err) {
      logger.error(err, "Failed to save sensor data");
      return res.status(500).json({ error: "DB error" });
    }
  });

  // GET /sensor/history → fetch last 10 readings
  router.get("/history", async (_req, res) => {
    try {
      const readings: SensorReading[] = await fetchRecentReadings(10);
      return res.json(readings);
    } catch (err) {
      logger.error(err, "Failed to fetch readings");
      return res.status(500).json({ error: "DB error" });
    }
  });

  return router;
}
