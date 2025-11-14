"use client";

import { AboutSubNav } from "@/components/AboutSubNav";
import { usePathname } from "next/navigation";
import styles from "./AboutLayout.module.css";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className={styles.container} aria-labelledby="about-page-title">
      {/* Hidden h1 ensures proper document landmark for screen readers */}
      <h1 id="about-page-title" className={styles.srOnly}>
        About Coldframe
      </h1>

      <AboutSubNav />

      {/* Key forces remount on sub-page change */}
      <div key={pathname} className={`fadeIn ${styles.content}`}>
        {children}
      </div>
    </section>
  );
}
