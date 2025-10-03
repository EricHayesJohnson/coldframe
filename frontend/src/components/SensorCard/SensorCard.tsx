"use client";

import { useSocketData } from "@/context/SocketContext";
import styles from "./SensorCard.module.css";
import { cToF } from "@/utils/temperature";
import { formatDateTime } from "@/utils/dateTime";

type SensorCardProps = {
  title: string;
};

export const SensorCard = ({ title }: SensorCardProps) => {
  const { latest } = useSocketData();

  if (!latest) {
    return <p>Waiting for sensor data...</p>;
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>

      <p className={styles.value}>
        <span className={styles.label}>Temperature:</span>
        {cToF(latest.temperatureC).toFixed(1)} °F
      </p>

      <p className={styles.value}>
        <span className={styles.label}>Humidity:</span>
        {latest.humidityPct.toFixed(1)} %
      </p>

      <p className={styles.value}>
        <span className={styles.label}>Pressure:</span>
        {latest.pressureHPa.toFixed(2)} hPa
      </p>

      <p className={styles.value}>
        <span className={styles.label}>Time:</span>
        {formatDateTime(latest.timestamp)}
      </p>
    </div>
  );
};
