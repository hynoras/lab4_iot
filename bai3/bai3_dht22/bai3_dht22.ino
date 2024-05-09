#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <BH1750.h>
#include <DHT.h>

#define DHTPIN D3     // Pin connected to the DHT22 sensor
#define DHTTYPE DHT22 // DHT type is DHT22

DHT dht(DHTPIN, DHTTYPE);

// BH1750 lightMeter(0x23); // I2C address 0x23

const char* ssid = "UiTiOt-E3.1";
const char* password = "UiTiOtAP";
// const char* serverAddress = "http://172.31.10.20";
// const int serverPort = 3000;


void setup() {
  Serial.begin(115200);
  Wire.begin();
  // lightMeter.begin();
  dht.begin();

  connectToWiFi();
}

void loop() {
  // float lightIntensity = lightMeter.readLightLevel();
  float temperature = dht.readTemperature();
  
  WiFiClient client;
  HTTPClient http;

  if (WiFi.status() == WL_CONNECTED) {
    DynamicJsonDocument doc(200);  
    // doc["value"] = lightIntensity;
    doc["value"] = temperature;
    doc["devicename"] = "Wemos D1 R2"; // Update with your device name
    // doc["sensorname"] = "BP1750"; // Update with your sensor name
    doc["sensorname"] = "DHT22"; // Update with your sensor name

    String payload;
    serializeJson(doc, payload);
    // http.begin(client, serverAddress, serverPort, "/light", false); // Specify the endpoint
    http.begin(client, "http://172.31.10.20:3000/data/save"); // Specify the endpoint
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(payload);
    Serial.println(httpCode);
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_CREATED) {
        String response = http.getString();
        Serial.println("Server response: " + response);
        DynamicJsonDocument respDoc(201);
        deserializeJson(respDoc, response);
      } else {
        Serial.println("HTTP error: " + String(httpCode));
      }
    } else {
      Serial.println("HTTP request failed");
    }
    
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
    connectToWiFi();
  }

  delay(20000); // Delay for 5 seconds
}


void connectToWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to WiFi");
}

