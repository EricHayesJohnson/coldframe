import { z } from "zod";

/**
 * SensorReadingSchema
 *
 * - `timestamp` is optional on input because the backend generates it.
 * - When stored or emitted, every reading will always include a timestamp.
 */
export const SensorReadingSchema = z.object({
  sensorId: z.string(),
  temperatureC: z.number(),
  humidityPct: z.number(),
  pressureHPa: z.number(),
  timestamp: z.string().datetime().optional(),
});
