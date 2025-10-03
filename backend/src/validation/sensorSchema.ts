import { z } from "zod";

export const SensorReadingSchema = z.object({
  sensorId: z.string(),
  temperatureC: z.number(),
  humidityPct: z.number(),
  pressureHPa: z.number(),
});
