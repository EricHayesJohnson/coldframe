export const steps = [
  {
    title: "Microcontroller → Wi-Fi Connection",
    protocol: "protocol: WiFiClientSecure",
    payload: `{
  ssid: "MyNetwork",
  ipAssigned: "192.168.0.105",
  reconnectStrategy: "auto"
}`,
    desc: "The ESP32 joins the local network using WiFiClientSecure. It retries until an IP address is assigned, then remains connected so it can post readings over HTTPS.",
  },

  {
    title: "Sensor → Microcontroller",
    protocol: "protocol: I²C (0x76)",
    payload: `{
  temperatureC: 21.42,
  humidityPct: 54.18,
  pressureHPa: 1008.64
}`,
    desc: "The BME280 sends raw temperature, humidity and pressure values to the ESP32 over the I²C bus. The firmware reads and bundles these values once every minute.",
  },

  {
    title: "Microcontroller → Backend API",
    protocol: "protocol: HTTPS (POST)",
    payload: `{
  "sensorId": "cf-001",
  "temperatureC": 21.42,
  "humidityPct": 54.18,
  "pressureHPa": 1008.64
}`,
    desc: "Once per minute the ESP32 sends a JSON payload to the backend using HTTPS. The request includes an x-api-key header and is validated with a Zod schema before being processed.",
  },

  {
    title: "Backend → Database",
    protocol: "protocol: PostgreSQL (TLS)",
    payload: `INSERT INTO SensorReading (
  sensorId,
  temperatureC,
  humidityPct,
  pressureHPa,
  timestamp,
  createdAt
) VALUES (...);`,
    desc: "The backend stores one hourly reading per sensor using Prisma, writing to a Supabase Postgres instance over a secure TLS connection.",
  },

  {
    title: "Backend → Dashboard (Real-Time)",
    protocol: "protocol: Socket.IO",
    payload: `emit("SENSOR_UPDATE", {
  sensorId: "cf-001",
  temperatureC: 21.42,
  humidityPct: 54.18,
  pressureHPa: 1008.64,
  timestamp: "2025-01-01T12:34:00.000Z"
});`,
    desc: "Each incoming reading is immediately rebroadcast to connected clients over Socket.IO. The dashboard listens for SENSOR_UPDATE events to refresh the live feed without reloading.",
  },

  {
    title: "Dashboard → Backend (Historical Data)",
    protocol: "protocol: HTTPS (GET)",
    payload: `[
  {
    "sensorId": "cf-001",
    "temperatureC": 21.42,
    "humidityPct": 52.1,
    "pressureHPa": 1008.6,
    "timestamp": "2025-01-01T12:00:00.000Z"
  },
  ...
]`,
    desc: "The Trends page retrieves historical readings using /api/sensor/history. The backend returns timestamped records sorted from oldest to newest, which the frontend normalizes and charts.",
  },
];
