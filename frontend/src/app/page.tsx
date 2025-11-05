"use client";

import { SensorCard } from "@/components";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <SensorCard title="Inside" />
        <SensorCard title="Outside" />
      </div>
    </main>
  );
}
