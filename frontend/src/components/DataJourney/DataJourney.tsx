"use client";
import { useState } from "react";
import styles from "./DataJourney.module.css";
import { steps } from "./dataJourneySteps";

export function DataJourney() {
  const [index, setIndex] = useState(0);
  const total = steps.length;

  const goNext = () => setIndex((i) => Math.min(i + 1, total - 1));
  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));

  const step = steps[index];

  return (
    <section className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.arrows}>
          <button onClick={goPrev} disabled={index === 0}>
            ‹
          </button>
          <button onClick={goNext} disabled={index === total - 1}>
            ›
          </button>
        </div>

        <div className={styles.stepIndicator}>
          Step {index + 1} / {total}
        </div>
      </div>

      <section className={styles.card}>
        <h3 className={styles.cardTitle}>{step.title}</h3>
        <p className={styles.protocol}>{step.protocol}</p>
        <pre className={styles.payload}>{step.payload}</pre>
        <p className={styles.desc}>{step.desc}</p>
      </section>
    </section>
  );
}
