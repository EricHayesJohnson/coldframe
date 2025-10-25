# Coldframe

**Coldframe** is a full-stack IoT system for monitoring home garden microclimates. Combining live ESP32 sensor data, a web-based real-time dashboard, and persistent trend storage.

---

## Overview

Coldframe captures data from **ESP32 + BME280** sensors and streams it through an **Express + Socket.IO backend** to a **Next.js frontend**.  
The system stores hourly snapshots in a Supabase (Postgres) database and visualizes trends via VisX charts.

---

## Tech Stack

| Layer                | Tech                          | Notes                                     |
| -------------------- | ----------------------------- | ----------------------------------------- |
| **Frontend**         | Next.js 15 / React 19         | Live updates via Socket.IO client         |
| **Backend**          | Express 5 / Socket.IO 4       | REST + WebSocket event gateway            |
| **Database**         | Supabase (Postgres)           | Prisma ORM for schema + queries           |
| **IoT Device**       | ESP32 Feather HUZZAH + BME280 | Posts sensor data every 60s via WiFi      |
| **Monorepo Tooling** | Nx                            | Manages builds, caching, dependency graph |

---
