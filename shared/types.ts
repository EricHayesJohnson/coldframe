export interface SensorReading {
  sensorId: string;
  temperatureC: number;
  humidityPct: number;
  pressureHPa: number;
  timestamp: string; // timestamp added by backend
}

export enum SocketEvents {
  SENSOR_UPDATE = "sensor:update",
}
