"use client";

import { useSocketData } from "@/context/SocketContext";
import { useLatestReading } from "@/hooks/useLatestReading";
import { getStatus } from "@/utils/getStatus";
import { StatusBadge } from "../StatusBadge";
import Skeleton from "react-loading-skeleton";
import { cToF } from "@/utils/temperature";
import { formatDateTime } from "@/utils/dateTime";
import styles from "./SensorCard.module.css";
import type { SensorReading } from "@/shared/types";

type SensorCardProps = { title: string };

export function SensorCard({ title }: SensorCardProps) {
  const { latest: socketLatest } = useSocketData();
  const { latest: dbLatest, isLoading } = useLatestReading();
  // let socketLatest = null;
  // let dbLatest = null;
  // let isLoading = false;
  let reading = socketLatest ?? dbLatest;

  const { status } = getStatus({
    fromSocket: socketLatest,
    fromStore: dbLatest,
    isLoading,
  });

  if (isLoading) {
    return (
      <div className={styles.card}>
        <Skeleton count={5} height={24} style={{ marginBottom: 16 }} />
      </div>
    );
  }

  if (!reading) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.statusInline}>
            <StatusBadge status={status} />
            <p className={styles.statusLabel}>{status.toUpperCase()}</p>
          </div>
        </div>
        <p>No sensor data available.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.statusInline}>
          <StatusBadge status={status} />
          <p className={styles.statusLabel}>{status.toUpperCase()}</p>
        </div>
      </div>

      <p className={styles.value}>
        <span className={styles.label}>Temperature:</span>
        {cToF(reading.temperatureC).toFixed(1)} °F
      </p>
      <p className={styles.value}>
        <span className={styles.label}>Humidity:</span>
        {reading.humidityPct.toFixed(1)} %
      </p>
      <p className={styles.value}>
        <span className={styles.label}>Pressure:</span>
        {reading.pressureHPa.toFixed(2)} hPa
      </p>
      <p className={styles.value}>
        <span className={styles.label}>Time:</span>
        {formatDateTime(reading.timestamp)}
      </p>
    </div>
  );
}
