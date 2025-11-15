export const steps = [
  {
    index: 0,
    title: "Microcontroller → Wi-Fi",
    protocol: "protocol: WiFiClientSecure",
    payload: `{
  ssid: "MyNetwork",
  ipAssigned: "192.168.0.105"
}`,
    desc: "The ESP32 connects to Wi-Fi using WiFiClientSecure. Once it receives an IP it stays online and sends readings over HTTPS.",
  },

  {
    index: 1,
    title: "Sensor → Microcontroller",
    protocol: "protocol: I²C",
    payload: `{
  temperatureC: 21.42,
  humidityPct: 54.18,
  pressureHPa: 1008.64
}`,
    desc: "The BME280 sends temperature, humidity and pressure over I²C. The ESP32 packages the values into JSON.",
  },

  {
    index: 2,
    title: "Microcontroller → Backend API",
    protocol: "protocol: HTTPS (POST)",
    payload: `{
  sensorId: "cf-001",
  temperatureC: 21.42,
  humidityPct: 54.18,
  pressureHPa: 1008.64
}`,
    desc: "Every 60 seconds the ESP32 posts a JSON payload to the backend. The request includes an x-api-key and is validated with Zod.",
  },

  {
    index: 3,
    title: "Backend → Database",
    protocol: "protocol: PostgreSQL (TLS)",
    payload: `{
  sensorId: "cf-001",
  timestamp: "2025-01-01 12:00",
  temperatureC: 21.4,
  humidityPct: 54.1,
  pressureHPa: 1008.6
}`,
    desc: "The backend writes one hourly sample to Postgres via Prisma.",
  },

  {
    index: 4,
    title: "Backend → Dashboard (Real-Time)",
    protocol: "protocol: Socket.IO",
    payload: `emit("SENSOR_UPDATE", {
  sensorId: "cf-001",
  temperatureC: 21.42,
  humidityPct: 54.18,
  pressureHPa: 1008.64,
  timestamp: "2025-01-01 12:34"
});`,
    desc: "The dashboard receives live readings over Socket.IO and updates without a page reload.",
  },

  {
    index: 5,
    title: "Dashboard → Backend (Historical)",
    protocol: "protocol: HTTPS (GET)",
    payload: `{
  sensorId: "cf-001",
  temperatureC: 21.42,
  humidityPct: 52.1,
  pressureHPa: 1008.6,
  timestamp: "2025-01-01 12:00"
}
// … more entries …`,
    desc: "The Trends page fetches timestamped readings from /api/sensor/history.",
  },
];
