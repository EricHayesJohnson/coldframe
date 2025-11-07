import { AboutSubNav } from "@/components/AboutSubNav";
import styles from "./AboutLayout.module.css";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.container} aria-labelledby="about-page-title">
      {/* Hidden h1 ensures proper document landmark for screen readers */}
      <h1 id="about-page-title" className={styles.srOnly}>
        About Coldframe
      </h1>

      <AboutSubNav />

      <div className={styles.content}>{children}</div>
    </section>
  );
}
