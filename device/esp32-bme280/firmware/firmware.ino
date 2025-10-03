#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "secrets.h"

// ====== SENSOR ======
Adafruit_BME280 bme; // I2C

void setup() {
  Serial.begin(115200);

  // --- Connect WiFi ---
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // --- Init sensor ---
  if (!bme.begin(0x76)) {
    Serial.println("❌ Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
  Serial.println("✅ BME280 sensor ready");
}

void loop() {
  // --- Read sensor values ---
  float tempC = bme.readTemperature();
  float humidity = bme.readHumidity();
  float pressure = bme.readPressure() / 100.0F; // Pa → hPa

  // --- Print locally ---
  Serial.print("Temp: "); Serial.print(tempC); Serial.println(" *C");
  Serial.print("Humidity: "); Serial.print(humidity); Serial.println(" %");
  Serial.print("Pressure: "); Serial.print(pressure); Serial.println(" hPa");
  Serial.println("-----------------------");

  // --- POST to backend ---
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    String payload = "{";
    payload += "\"sensorId\":\"ESP32-1\",";
    payload += "\"temperatureC\":" + String(tempC, 2) + ",";
    payload += "\"humidityPct\":" + String(humidity, 2) + ",";
    payload += "\"pressureHPa\":" + String(pressure, 2);
    payload += "}";

    int httpResponseCode = http.POST(payload);
    if (httpResponseCode > 0) {
      Serial.print("✅ POST Response: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("❌ POST Error: ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }
    http.end();
  } else {
    Serial.println("⚠️ WiFi not connected!");
  }

  delay(5000);
}
