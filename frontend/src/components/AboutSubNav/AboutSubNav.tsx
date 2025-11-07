"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AboutSubNav.module.css";

const LINKS = [
  { href: "/about/overview", label: "Overview" },
  { href: "/about/design", label: "Design" },
  { href: "/about/schematics", label: "Schematics" },
  { href: "/about/roadmap", label: "Roadmap" },
];

export function AboutSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {LINKS.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
