/**
 * Coldframe Sensor Firmware – ESP32 + BME280
 * Reads sensor data every minute and POSTs JSON to backend.
 * 
 * Features:
 * - Non-blocking 60-second timer using millis()
 * - Wi-Fi connection with retry / auto-restart
 * - JSON payload via ArduinoJson
 * - Clean HTTP open/close per request
 */

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "secrets.h"

Adafruit_BME280 bme;

const unsigned long POST_INTERVAL = 60UL * 1000;
unsigned long lastPostTime = 0;

void setup() {
  Serial.begin(115200);

  // --- Wi-Fi connect with retry ---
  Serial.printf("Connecting to WiFi SSID: %s\n", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  const int MAX_RETRIES = 30;
  int attempts = 0;

  while (WiFi.status() != WL_CONNECTED && attempts < MAX_RETRIES) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\n❌ WiFi connection failed — restarting...");
    delay(2000);
    ESP.restart();
  }
  Serial.printf("\n✅ WiFi connected!  IP: %s\n", WiFi.localIP().toString().c_str());

  // --- Sensor init ---
  if (!bme.begin(0x76)) {
    Serial.println("❌ Could not find BME280 sensor, check wiring!");
    while (1); // stop if not found
  }
  Serial.println("✅ BME280 sensor ready");
}

void loop() {
  unsigned long now = millis();

  // every POST_INTERVAL ms
  if (now - lastPostTime >= POST_INTERVAL) {
    lastPostTime = now;

    // --- Read sensor ---
    float tempC = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressure = bme.readPressure() / 100.0F; // Pa → hPa

    Serial.printf("Temp: %.2f °C | Humidity: %.2f %% | Pressure: %.2f hPa\n", tempC, humidity, pressure);

    // --- Wi-Fi check ---
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("⚠️ Wi-Fi lost — attempting reconnect...");
      WiFi.reconnect();
      return; // skip this cycle
    }

    // --- Build JSON payload ---
    StaticJsonDocument<256> doc;
    doc["sensorId"]     = SENSOR_ID;
    doc["temperatureC"] = tempC;
    doc["humidityPct"]  = humidity;
    doc["pressureHPa"]  = pressure;

    String payload;
    serializeJson(doc, payload);

    // --- Send POST ---
    WiFiClientSecure client;
    client.setInsecure();  // ⚠️ disables certificate verification

    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("x-api-key", SENSOR_API_KEYS);

    int code = http.POST(payload);
    if (code > 0) {
      Serial.printf("✅ HTTP %d\n", code);
      Serial.println(http.getString());
    } else {
      Serial.printf("❌ POST failed (%d)\n", code);
    }
    http.end(); // free memory
  }

  // loop remains free for future tasks; no blocking delay
}
