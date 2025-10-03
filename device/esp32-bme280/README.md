# ESP32 + BME280 Firmware

This folder contains firmware for the Coldframe IoT device.

## Files

- `firmware.ino` – main Arduino sketch (committed).
- `secrets.example.h` – template showing required config values.
- `secrets.h` – real WiFi + server config (ignored via `.gitignore`).

## Usage

1. Copy `secrets.example.h` → `secrets.h`.
2. Fill in your actual WiFi SSID, password, and backend server URL.
3. Open `firmware.ino` in Arduino IDE.
4. Compile + upload to ESP32 Feather HUZZAH32.
5. Monitor serial output to confirm WiFi + sensor readings + successful POSTs.
