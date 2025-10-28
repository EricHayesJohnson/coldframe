import { SensorReading } from "@/shared/types";

export const MOCK_READING: SensorReading = {
  sensorId: "esp32-dev",
  temperatureC: 21.37,
  humidityPct: 58.6,
  pressureHPa: 1016.43,
  // Fixed timestamp avoids hydration mismatch
  timestamp: "2025-10-28T07:27:12.000Z",
};
