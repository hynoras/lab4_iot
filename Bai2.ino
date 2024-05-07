#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter(0x23); // I2C address 0x23

const char* ssid = "UiTiOt-E3.1";
const char* password = "UiTiOtAP";
const char* serverAddress = "http://172.31.10.20";
const int serverPort = 3000; // Your server port

const int ledPin1 = D6;
const int ledPin2 = D7;
const int ledPin3 = D8;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  lightMeter.begin();

  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  connectToWiFi();
}

void loop() {
  float lightIntensity = lightMeter.readLightLevel();
  
  WiFiClient client;
  HTTPClient http;

  if (WiFi.status() == WL_CONNECTED) {
    DynamicJsonDocument doc(200);
    doc["light"] = lightIntensity;
    
    String payload;
    serializeJson(doc, payload);
    // http.begin(client, serverAddress, serverPort, "/light", false); // Specify the endpoint
    http.begin(client, "http://172.31.10.20:3000/light"); // Specify the endpoint
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(payload);
    Serial.println(httpCode);
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.println("Server response: " + response);
        DynamicJsonDocument respDoc(200);
        deserializeJson(respDoc, response);
        int numLights = respDoc["data"]["numLights"];
        updateLEDs(numLights);
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

  delay(5000); // Delay for 5 seconds
}


void connectToWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to WiFi");
}

void updateLEDs(int numLights) {
  digitalWrite(ledPin1, numLights >= 1 ? HIGH : LOW);
  digitalWrite(ledPin2, numLights >= 2 ? HIGH : LOW);
  digitalWrite(ledPin3, numLights >= 3 ? HIGH : LOW);
}
