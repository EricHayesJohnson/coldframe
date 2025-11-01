import { Router } from "express";
import { Server } from "socket.io";
import { SensorReading, SensorReadingInput, SocketEvents } from "../types";
import { logger } from "../utils/logger";
import { SensorReadingSchema } from "../validation/sensorSchema";
import {
  handleNewReading,
  fetchRecentReadings,
  fetchLatestReading,
} from "../services/sensorService";
import { verifyApiKey } from "../middleware/verifyApiKey";

export function sensorRoutes(io: Server) {
  const router = Router();

  // Protected POST /sensor → broadcast + delegate persistence
  router.post("/", verifyApiKey, async (req, res) => {
    const parsed = SensorReadingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid sensor data",
        details: parsed.error.issues,
      });
    }

    const input: SensorReadingInput = parsed.data;
    const reading: SensorReading = {
      ...input,
      timestamp: input.timestamp ?? new Date().toISOString(),
    };

    try {
      // Always emit live update (real-time layer)
      io.emit(SocketEvents.SENSOR_UPDATE, reading);
      logger.info(reading, "Live reading emitted");

      // Delegate persistence decision to service
      await handleNewReading(reading);

      return res.status(200).json(reading);
    } catch (err) {
      logger.error(err, "Failed to process sensor reading");
      return res.status(500).json({ error: "Internal error" });
    }
  });

  // Public GET /sensor/history?range=24
  router.get("/history", async (req, res) => {
    try {
      const rangeHours = Number(req.query.range || 24);
      const readings = await fetchRecentReadings(rangeHours);
      return res.json(readings);
    } catch (err) {
      logger.error(err, "Failed to fetch readings");
      return res.status(500).json({ error: "DB error" });
    }
  });

  router.get("/latest", async (_req, res) => {
    try {
      const latest = await fetchLatestReading();
      if (!latest) {
        return res.status(404).json({ error: "No sensor data found" });
      }
      return res.json(latest);
    } catch (err) {
      logger.error(err, "Failed to fetch latest reading");
      return res.status(500).json({ error: "DB error" });
    }
  });

  return router;
}
