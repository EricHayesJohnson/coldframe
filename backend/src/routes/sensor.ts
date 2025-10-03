import { Router } from "express";
import { Server } from "socket.io";
import { SensorReading, SocketEvents } from "@shared/types";
import { logger } from "../utils/logger";
import { SensorReadingSchema } from "src/validation/sensorSchema";

/**
 * Sensor Routes
 *
 * Mounted at ROUTES.SENSOR from index.ts
 * → e.g. POST /api/sensor
 */
export function sensorRoutes(io: Server) {
  const router = Router();

  router.post("/", (req, res) => {
    const result = SensorReadingSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Invalid sensor data",
        details: result.error.issues,
      });
    }

    const reading: SensorReading = {
      ...result.data,
      timestamp: new Date().toISOString(),
    };

    // Log + Re-broadcast data to frontend
    logger.info(reading, "Received sensor data");
    io.emit(SocketEvents.SENSOR_UPDATE, reading);

    return res.status(200).json({ ok: true });
  });

  return router;
}
