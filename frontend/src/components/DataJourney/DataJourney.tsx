"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./DataJourney.module.css";
import { steps } from "./dataJourneySteps";

export function DataJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount =
      dir === "left"
        ? -container.clientWidth * 0.9
        : container.clientWidth * 0.9;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.navRow}>
        <div className={styles.arrows}>
          <button
            onClick={() => scroll("left")}
            disabled={atStart}
            aria-label="Previous step"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={atEnd}
            aria-label="Next step"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.flow} ref={containerRef}>
        {steps.map((s, i) => (
          <section key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.headerDots}>
                <span />
                <span />
                <span />
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.protocol}>{s.protocol}</p>
              <pre className={styles.payload}>{s.payload}</pre>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
