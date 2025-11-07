"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo/Logo";
import styles from "./Navbar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>
          Feeds
        </Link>
        <Link href="/trends" className={styles.link}>
          Trends
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
      </div>
    </nav>
  );
};
