"use client";

import { SensorCard } from "@/components";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <SensorCard title="ESP-32: Inside" />
        <SensorCard title="ESP-32: Outside" />
      </div>
    </main>
  );
}
