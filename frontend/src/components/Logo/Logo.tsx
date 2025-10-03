"use client";

function LeafSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      aria-hidden="true"
    >
      <path d="M15 3C9 6 5 12 5 18c0 6 4 11 10 11V3Z" fill="#222222" />
      <path d="M17 29c6-1 10-6 10-11 0-.5 0-1-.1-1.6L17 26v3Z" fill="#222222" />
      <path d="M24.3 10c-.5-1-1-2-1.7-3l-5.6 5.6V17l7.3-7Z" fill="#222222" />
      <path
        d="M21.2 5c-1-1-2-1.7-3.2-2.3-.3-.1-.6-.2-1-.3v7l4.2-4.4Z"
        fill="#222222"
      />
      <path d="M25.2 12 17 20v4l9-9c-.2-1-.5-2-1-3Z" fill="#222222" />
    </svg>
  );
}

import styles from "./Logo.module.css";

export function Logo() {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.leaf}>
        <LeafSvg />
      </div>
      <div className={styles.logoText}>Coldframe</div>
    </div>
  );
}
