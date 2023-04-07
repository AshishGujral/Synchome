//Include libraries and Definations
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include "DHT.h"
#define DHTTYPE DHT22
#define timeSeconds 2

//Wifi ssid and password for connecting to local internet
// const char* ssid="Pixel_7601";
// const char* password = "6046144043";
const char* ssid="Pixel";
const char* password = "2e332de8a999";

// JSON data buffer
StaticJsonDocument<250> jsonDocument;
char buffer[250];

//Webserver constructor
WebServer server(80);

//Initializing LED pins
uint8_t LEDRedPin = 2;
uint8_t LEDGreenPin = 4;
uint8_t LEDBluePin = 5;

//Initializing Soil Pins
uint8_t SoilPin = 34;
uint8_t SoilLedPin = 23;

//Initializing MOTOR pins
uint8_t MotorEnablePin = 13;
uint8_t MotorPin1 = 25;
uint8_t MotorPin2 = 26;

//Initializing Motion pins
uint8_t MotionLed = 22;
uint8_t MotionSensor = 27;

//Initializing DHT Sensor pin
uint8_t DHTPin = 18;

//Initializing LED status variables
bool LEDRed = LOW;
bool LEDGreen = LOW;
bool LEDBlue = LOW;

//Initializing SOIL LED status variables
bool SoilLed = LOW;

//Initializing DHT variables
float Temperature;
float Humidity;
DHT dht(DHTPin, DHTTYPE);

//Initializing Soil variables
uint8_t SoilMoisture;
uint8_t SensorAnalog;
String SoilLedStatus="";

//Initializing Motion variables
unsigned long now = millis();
unsigned long lastTrigger = 0;
boolean startTimer = false;
boolean motion = false;
String motionStatus = "";

//Defining interrupt service routine for motion sensor
// Checks if motion was detected, sets LED HIGH and starts a timer
void IRAM_ATTR detectsMovement() {
  digitalWrite(MotionLed, HIGH);
  startTimer = true;
  lastTrigger = millis();
}

//Initializing Motor variables
const int frequency = 500;
const int pwm_channel = 0;
const int resolution = 8;
int motorSpeed;
String motorStatus = "";
int startDutyCycle;
int endDutyCycle;

//Initializing LEDs variables
String LEDMode = "";
String LEDName = "";
String LEDStatus = "OFF";


void setup() {
  Serial.begin(115200);

  delay(1000);  
  
  xTaskCreatePinnedToCore (
    runMotor,     // Function to implement the task
    "runMotor",   // Name of the task
    1000,      // Stack size in words
    NULL,      // Task input parameter
    0,         // Priority of the task
    NULL,      // Task handle.
    0          // Core where the task should run
  );

  delay(1000);

  xTaskCreatePinnedToCore(
    runMotion,     // Function to implement the task
    "runMotion",   // Name of the task
    1000,      // Stack size in words
    NULL,      // Task input parameter
    0,         // Priority of the task
    NULL,      // Task handle.
    0          // Core where the task should run
  );

  delay(1000);

  initWiFi();
  delay(3000);

  // ledPinsInit();
  // delay(1000);

  // dhtPinsInit();
  // delay(1000);

  // motorPinsInit();
  // delay(1000);

  soilPinsInit();
  delay(1000);

  // motionPinsInit();
  delay(5000);  

  routeSetup();
  delay(1000);
  
}

void loop() {
  //Server listening for clients
  server.handleClient();

 //LED Looping
  // runLeds();

  //Soil LED Looping
  runSoilLed();

}

void runMotor(void* pvParameters){

  while(1){
    if(motorStatus == "ON"){
      digitalWrite(MotorPin1, LOW);
      digitalWrite(MotorPin2, HIGH);  
      for(int i = startDutyCycle; i<endDutyCycle;i++){
        ledcWrite(pwm_channel,i);
        delay(20);
      }
    }
    else{
      digitalWrite(MotorPin1, LOW);
      digitalWrite(MotorPin2, LOW); 
    }
  }

  
}

void runMotion(void * pvParameters){
  while(1){
    if(motionStatus == "ON"){
      // Current time
      now = millis();
      if((digitalRead(MotionLed) == HIGH) && (motion == false)) {
        Serial.println("MOTION DETECTED!!!");
        motion = true;
      }
      // Turn off the LED after the number of seconds defined in the timeSeconds variable
      if(startTimer && (now - lastTrigger > (timeSeconds*1000))) {
        Serial.println("Motion stopped...");
        digitalWrite(MotionLed, LOW);
        startTimer = false;
        motion = false;
      }
    }
    else{
      digitalWrite(MotionLed, LOW);
      startTimer = false;
      motion = false;
    }
  }
}

void runSoilLed(){
  if(SoilLed){
    digitalWrite(SoilLedPin, HIGH);    
  }
  else{
    digitalWrite(SoilLedPin, LOW);
  }
}

void runLeds(){
  if(LEDMode == "NORMAL"){
    if(LEDRed){
      digitalWrite(LEDRedPin, HIGH);
    }
    else{
      digitalWrite(LEDRedPin, LOW);
    }
    if(LEDGreen){
      digitalWrite(LEDGreenPin, HIGH);
    }
    else{
      digitalWrite(LEDGreenPin, LOW);
    }
    if(LEDBlue){
      digitalWrite(LEDBluePin, HIGH);
    }
    else{
      digitalWrite(LEDBluePin, LOW);
    }
  }
  else if(LEDMode == "BLINK"){
    if(LEDRed){
      digitalWrite(LEDRedPin, HIGH);
      delay(1000);
      digitalWrite(LEDRedPin, LOW);
      delay(1000);
    }
    else{
      digitalWrite(LEDRedPin, LOW);
    }
    if(LEDGreen){
      digitalWrite(LEDGreenPin, HIGH);
      delay(1000);
      digitalWrite(LEDGreenPin, LOW);
      delay(1000);
    }
    else{
      digitalWrite(LEDGreenPin, LOW);
    }
    if(LEDBlue){
      digitalWrite(LEDBluePin, HIGH);
      delay(1000);
      digitalWrite(LEDBluePin, LOW);
      delay(1000);
    }
    else{
      digitalWrite(LEDBluePin, LOW);
    }

  }
  else{
    digitalWrite(LEDRedPin, LOW);
    digitalWrite(LEDGreenPin, LOW);
    digitalWrite(LEDBluePin, LOW);
  }
}

//Function to initialize Soil Pins
void soilPinsInit(){
  pinMode(SoilLedPin, OUTPUT);
}

//Function to initialize LED Pins. Either Input or Output.
void ledPinsInit(){
  pinMode(LEDRedPin, OUTPUT);
  pinMode(LEDGreenPin, OUTPUT);
  pinMode(LEDBluePin, OUTPUT);
}

// Function to initialize motion Pins.
void motionPinsInit(){
  // PIR Motion Sensor mode INPUT_PULLUP
  pinMode(MotionSensor, INPUT_PULLUP);
  // Set motionSensor pin as interrupt, assign interrupt function and set RISING mode
  attachInterrupt(digitalPinToInterrupt(MotionSensor), detectsMovement, RISING);

  // Set LED to LOW
  pinMode(MotionLed, OUTPUT);
  digitalWrite(MotionLed, LOW);
}

//Function to initialize DHT Pins. 
void dhtPinsInit(){
  //DHT Initalizing
  pinMode(DHTPin, INPUT);
  dht.begin();
}

//Function to initalize Motor Pins.
void motorPinsInit(){
  pinMode(MotorEnablePin, OUTPUT);
  pinMode(MotorPin1, OUTPUT);
  pinMode(MotorPin2, OUTPUT); 
  digitalWrite(MotorPin1, LOW);
  digitalWrite(MotorPin2, LOW);

  ledcSetup(pwm_channel, frequency, resolution);
  ledcAttachPin(MotorEnablePin, pwm_channel);
}

//Function to connect to wifi
void initWiFi(){
  WiFi.mode(WIFI_STA);
  delay(3000);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

void routeSetup(){
  server.on("/", handleOnConnect);
  
  delay(1000);

  //LED Route
  server.on("/handleLED", HTTP_POST, handleLED);

  delay(1000);

  //DHT Route
  server.on("/handleDHT", handleDHT);

  delay(1000);

  //Motor Route
  server.on("/handleMotor", HTTP_POST, handleMotor);

  delay(1000);

  //Motion Route
  server.on("/handleMotion", HTTP_POST, handleMotion);

  delay(1000);

  //Soil Route
  server.on("/handleSoil", handleSoil);

  //Soil LED
  server.on("/handleSoilLed", HTTP_POST, handleSoilLed);  

  server.begin();
  Serial.println("HTTP server started");
}

void handleOnConnect(){
  Serial.println("Connected");
  create_json();
  server.send(200, "application/json", buffer);
}


//Handle Motion
void handleMotion(){
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  motionStatus = jsonDocument["status"].as<String>();
  create_json();
  server.send(200, "application/json", buffer);
}

// Handle Motor
void handleMotor(){
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  motorSpeed = jsonDocument["speed"].as<int>();
  motorStatus = jsonDocument["status"].as<String>();

  if(motorSpeed==1){
    startDutyCycle = 0;
    endDutyCycle = 85;
  }
  else if(motorSpeed==2){
    startDutyCycle = 86;
    endDutyCycle = 170;
  }
  else if(motorSpeed==3){
    startDutyCycle = 171;
    endDutyCycle = 255;
  }
  else{
    startDutyCycle = 0;
    endDutyCycle = 255;
  }

  create_json();
  server.send(200, "application/json", buffer);

}

//Handle Soil LED
void handleSoilLed(){
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  SoilLedStatus = jsonDocument["status"].as<String>();
  
  Serial.println("Soil LED Status: "+SoilLedStatus);

  if(SoilLedStatus=="ON"){
    SoilLed = HIGH;
  }
  else{
    SoilLed = LOW;
  }
  
  create_json();
  server.send(200, "application/json", buffer);
}

//Handle LED Function
void handleLED(){
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);
  LEDMode = jsonDocument["mode"].as<String>();
  LEDName = jsonDocument["name"].as<String>();
  LEDStatus = jsonDocument["status"].as<String>();

  Serial.println("LED Mode: "+LEDMode);
  Serial.println("LED Name: "+LEDName);
  Serial.println("LED Status: "+LEDStatus);

  if(LEDStatus == "ON"){
    if(LEDName == "red"){
      LEDRed = HIGH;
    }
    else if(LEDName == "green"){
      LEDGreen = HIGH;
    }
    else if(LEDName == "blue"){
      LEDBlue = HIGH;
    }
    else if(LEDName == "all"){
      LEDRed = HIGH;
      LEDGreen = HIGH;
      LEDBlue = HIGH;
    }
    else{
      LEDRed = LOW;
      LEDGreen = LOW;
      LEDBlue = LOW;
    }
  }
  else{
    if(LEDName == "red"){
      LEDRed = LOW;
    }
    else if(LEDName == "green"){
      LEDGreen = LOW;
    }
    else if(LEDName == "blue"){
      LEDBlue = LOW;
    }
    else if(LEDName == "all"){
      LEDRed = LOW;
      LEDGreen = LOW;
      LEDBlue = LOW;
    }
    else{
      LEDRed = LOW;
      LEDGreen = LOW;
      LEDBlue = LOW;
    }
  }
  create_json();
  server.send(200, "application/json", buffer);
}

//Handle Soil
void handleSoil(){
  SensorAnalog = analogRead(SoilPin);
  SoilMoisture = ( 100 - ( (SensorAnalog/4095.00) * 100 ) );
  Serial.print("Moisture = ");
  Serial.print(SoilMoisture);  /* Print Temperature on the serial window */
  Serial.println("%");
  delay(1000);   
  create_soil_json();
  server.send(200, "application/json", buffer);
}

//Handle DHT
void handleDHT(){
  Temperature = dht.readTemperature(); // Gets the values of the temperature
  Humidity = dht.readHumidity(); // Gets the values of the humidity
  Serial.println("Temperature: "+ ((String)Temperature));
  Serial.println("Humidity: "+ ((String)Humidity));
  create_dht_json();
  server.send(200, "application/json", buffer);   
}


//Create JSON object
void create_json() {    
  jsonDocument.clear();  
  jsonDocument["success"] = "true";
  serializeJson(jsonDocument, buffer);
}

//Create DHT JSON Object
void create_dht_json() {  
  jsonDocument.clear();  
  jsonDocument["success"] = "true";
  jsonDocument["temperature"] = (String)Temperature ;
  jsonDocument["humidity"] = (String)Humidity;
  serializeJson(jsonDocument, buffer);
}

//Create Soil Moisture JSON Object
void create_soil_json(){
  jsonDocument.clear();  
  jsonDocument["success"] = "true";
  jsonDocument["moisture"] = (String)SoilMoisture ;
  serializeJson(jsonDocument, buffer);
}