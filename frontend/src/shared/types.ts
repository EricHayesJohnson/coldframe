/**
 * Shared Types
 *
 * These types are used across frontend, backend, and sockets to ensure
 * the same data shape is used consistently throughout the system.
 */

export interface SensorReadingInput {
  /** Unique ID for the reporting sensor */
  sensorId: string;
  /** Temperature in Celsius */
  temperatureC: number;
  /** Relative humidity percentage */
  humidityPct: number;
  /** Pressure in hectopascals */
  pressureHPa: number;
  /** Optional timestamp (ESP32 can send it, backend will add if missing) */
  timestamp?: string | undefined;
}

/**
 * The canonical SensorReading object returned by the backend
 * and emitted through Socket.IO.
 */
export interface SensorReading extends Required<SensorReadingInput> {
  /** Timestamp is always present once processed by backend */
  timestamp: string;
}

/**
 * Socket.IO event names shared across client/server
 */
export enum SocketEvents {
  SENSOR_UPDATE = "SENSOR_UPDATE",
}
