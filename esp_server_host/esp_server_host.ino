#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <WebSocketsServer.h>
#include <Wire.h>
#include "rgb_lcd.h"

// Constants
const char *ssid = "SockTag";
const char *password =  "SOCKTAG!";
const char *msg_toggle_led = "toggleLED";
const char *msg_get_led = "getLEDState";
const int dns_port = 53;
const int http_port = 80;
const int ws_port = 1337;

const int redPin = 13;
const int yellowPin = 12;
const int greenPin = 14;
const int bluePin = 27;
const int whitePin = 26;

//LCD
rgb_lcd lcd;

// Globals
AsyncWebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(1337);
char msg_buf[10];
/***********************************************************
 * Functions
 */
void toggleOff(){
  digitalWrite(redPin, LOW);
  digitalWrite(yellowPin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, LOW);
  digitalWrite(whitePin, LOW);
}

// Callback: receiving any WebSocket message
void onWebSocketEvent(uint8_t client_num,
                      WStype_t type,
                      uint8_t * payload,
                      size_t length) {

  // Figure out the type of WebSocket event
  switch(type) {

    // Client has disconnected
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", client_num);
      break;

    // New client has connected
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(client_num);
        Serial.printf("[%u] Connection from ", client_num);
        Serial.println(ip.toString());
      }
      break;

    // Handle text messages from client
    case WStype_TEXT:

      // Print out raw message
      Serial.printf("[%u] Received text: %s\n", client_num, payload);

      // Toggle LED
      toggleOff();
      if ( strcmp((char *)payload, "S") == 0 ) {
        digitalWrite(bluePin, HIGH);
      }
      else if ( strcmp((char *)payload, "DND") == 0 ) {
        digitalWrite(redPin, HIGH);
      }
      else if ( strcmp((char *)payload, "BPK") == 0 ) {
        digitalWrite(greenPin, HIGH);
      }
      else if ( strcmp((char *)payload, "CA") == 0 ) {
        digitalWrite(yellowPin, HIGH);
      }
      else if ( strcmp((char *)payload, "SOCK") == 0 ) {
        digitalWrite(whitePin, HIGH);
      }
      // Message not recognized
      else {
        Serial.println("[%u] Message not recognized");
      }
      break;

    // For everything else: do nothing
    case WStype_BIN:
    case WStype_ERROR:
    case WStype_FRAGMENT_TEXT_START:
    case WStype_FRAGMENT_BIN_START:
    case WStype_FRAGMENT:
    case WStype_FRAGMENT_FIN:
    default:
      break;
  }
}

// Callback: send homepage
void onIndexRequest(AsyncWebServerRequest *request) {
  IPAddress remote_ip = request->client()->remoteIP();
  Serial.println("[" + remote_ip.toString() +
                  "] HTTP GET request of " + request->url());
  request->send(SPIFFS, "/index.html", "text/html");
}

// Callback: send style sheet
void onCSSRequest(AsyncWebServerRequest *request) {
  IPAddress remote_ip = request->client()->remoteIP();
  Serial.println("[" + remote_ip.toString() +
                  "] HTTP GET request of " + request->url());
  request->send(SPIFFS, "/style.css", "text/css");
}

// Callback: send 404 if requested file does not exist
void onPageNotFound(AsyncWebServerRequest *request) {
  IPAddress remote_ip = request->client()->remoteIP();
  Serial.println("[" + remote_ip.toString() +
                  "] HTTP GET request of " + request->url());
  request->send(404, "text/plain", "Not found");
}

void listFiles() {
  Serial.println("Listing files in SPIFFS:");
  File root = SPIFFS.open("/");
  File file = root.openNextFile();
  while (file) {
    Serial.print("FILE: ");
    Serial.println(file.name());
    file = root.openNextFile();
    }
  }

/***********************************************************
 * Main
 */

/*void setup() {
  // Init LED and turn off
  pinMode(led_pin, OUTPUT);
  digitalWrite(led_pin, LOW);

  // Init Grove 
  lcd.begin(16, 2);
  lcd.setRGB(0,0,255);

  // Start Serial port
  Serial.begin(115200);


  // Make sure we can read the file system
  if( !SPIFFS.begin(true)){
    Serial.println("Error mounting SPIFFS");
    while(1);
  }

  // Start access point
  WiFi.softAP(ssid, password);

  // Print our IP address
  Serial.println();
  Serial.println("AP running");
  Serial.print("My IP address: ");
  Serial.println(WiFi.softAPIP());

  // On HTTP request for root, provide index.html file
  //server.on("/", HTTP_GET, onIndexRequest);

  // On HTTP request for style sheet, provide style.css
  //server.on("/style.css", HTTP_GET, onCSSRequest);

  // Handle requests for pages that do not exist
  //server.onNotFound(onPageNotFound);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    IPAddress remote_ip = request->client()->remoteIP();
    Serial.println("[" + remote_ip.toString() +
                    "] HTTP GET request of " + request->url());
    request->send(SPIFFS, "/index2.html", "text/html");
    Serial.println("Hello");
  });

  // Start web server
  server.begin();

  // Start WebSocket server and assign callback
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent); 
}*/

void setup() {
  // Init LED and turn off
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(whitePin, OUTPUT);

  // Init Grove 
  lcd.begin(16, 2);
  lcd.setRGB(0, 0, 255);

  // Start Serial port
  Serial.begin(115200);

  // Initialize SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("Error mounting SPIFFS");
    while (1);
  }

  listFiles();

  // Start access point
  WiFi.softAP(ssid, password);

  // Print our IP address
  Serial.println();
  Serial.println("AP running");
  Serial.print("My IP address: ");
  Serial.println(WiFi.softAPIP());

  // Serve index.html for root URL
  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");
  server.serveStatic("/static/", SPIFFS, "/");

  
//  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
//    request->send(SPIFFS, "/index.html", "text/html");
//  });
//
//    server.on("/index", HTTP_GET, [](AsyncWebServerRequest *request) {
//    request->redirect("/");
//  });
//
//  // Serve index2.html for "/index2.html" URL
//  server.on("/index2.html", HTTP_GET, [](AsyncWebServerRequest *request) {
//    request->send(SPIFFS, "/index2.html", "text/html");
//  });
//
//  // Serve index3.html for "/index2.html" URL
//  server.on("/index3.html", HTTP_GET, [](AsyncWebServerRequest *request) {
//    request->send(SPIFFS, "/index3.html", "text/html");
//  });

  // Handle requests for pages that do not exist
  server.onNotFound(onPageNotFound);

  // Start web server
  server.begin();

  // Start WebSocket server and assign callback
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
}


void loop() {
  // Look for and handle WebSocket data
  webSocket.loop();
}
