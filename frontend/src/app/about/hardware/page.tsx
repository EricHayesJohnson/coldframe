import styles from "./page.module.css";

export default function HardwarePage() {
  return (
    <section>
      <h2>Hardware</h2>
      <p className={styles.intro}>
        Coldframe runs on a simple but reliable hardware stack built around an
        ESP32 microcontroller and a BME280 climate sensor. The goal was to keep
        the wiring minimal, the parts well-supported, and the system robust
        enough to run outdoors year-round.
      </p>
    </section>
  );
}
