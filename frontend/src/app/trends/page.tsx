import { Chart } from "@/components";
import styles from "./page.module.css";

export default function TrendsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Chart />
      </div>
    </main>
  );
}
