import express, { response } from "express";
import axios from "axios";
import fetch from "node-fetch";
import LED from "../models/Led.js";
import DHT from "../models/DHT.js";
import SOIL from "../models/Soil.js";
import MOTION from "../models/Motion.js";
import RANGE from "../models/Range.js";
import FAN from "../models/Fan.js";
import SOILRANGE from "../models/SoilRange.js";
import SOILLED from "../models/SoilLed.js";
const router = express.Router();
const espIP = "http://192.168.52.28";

//Manage LED
router.post("/manageLed", async (req, res) => {
  const body = {
    name: req.body.name,
    mode: req.body.mode,
    status: req.body.status,
  };

  const response = await fetch(`${espIP}/handleLED`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const responseData = await response.json();

  if (responseData.success == "true") {
    const data = new LED({
      name: req.body.name,
      time: Date.now(),
      ledStatus: req.body.status,
      mode: req.body.mode,
      userId: req.body.userId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//Manage Soil LED
router.post("/manageSoilLed", async (req, res) => {
  const body = {
    status: req.body.status,
  };

  const response = await fetch(`${espIP}/handleSoilLed`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const responseData = await response.json();

  if (responseData.success == "true") {
    const data = new SOILLED({
      time: Date.now(),
      ledStatus: req.body.status,
      userId: req.body.userId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});


//Manage DHT(Temperature and Humidity)
router.post("/manageDHT", async (req, res) => {
  const response = await fetch(`${espIP}/handleDHT`);

  const responseData = await response.json();

  if (responseData.success == "true") {
    const data = new DHT({
      temperature: responseData.temperature,
      humidity: responseData.humidity,
      time: Date.now(),
      userId: req.body.userId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//Manage Soil Moisture
router.post("/manageSoil", async (req, res) => {
  const response = await fetch(`${espIP}/handleSoil`,{
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();

  if (responseData.success == "true") {
    const data = new SOIL({
      moisture: responseData.moisture,  
      time: Date.now(),
      userId: req.body.userId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//Manage Fan
router.post("/manageFan", async (req, res) => {
  const body = {
    speed: req.body.speed,
    status: req.body.status,
  };

  const response = await fetch(`${espIP}/handleMotor`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();

  if (responseData.success == "true") {
    const data = new FAN({
      time: Date.now(),
      speed: req.body.speed,
      status: req.body.status,
      userId: req.body.userId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//Manage Motion
router.post("/manageMotion", async (req, res) => {
  const body = {
    status: req.body.status,
  };

  const response = await fetch(`${espIP}/handleMotion`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const responseData = await response.json();

  if (responseData.success == "true") {
    const data = new MOTION({
      time: Date.now(),
      status: req.body.status,
      userId: req.body.userId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//Save and update Temperature and humidity Range Data
router.put("/saveRange", async (req, res) => {
  const body = {
    tempMax: parseInt(req.body.tempVal),
    tempMin: parseInt(req.body.humVal),
    time: Date.now(),
    humMax: parseInt(req.body.minRange),
    humMin: parseInt(req.body.maxRange),
    userId: req.body.userId,
  };

  try {
    const dataToSave = await RANGE.findOneAndUpdate(
      { userId: req.body.userId },
      {
        $set: req.body,
      },
      { upsert: true }
    );
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get Temperature and humidity Range Data
router.get("/saveRange", async (req, res) => {
  try {
    const data = await RANGE.findOne();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Save and update Soil Range Data
router.put("/saveSoilRange", async (req, res) => {
  const body = {
    time: Date.now(),
    moistMax: req.body.maxRange,
    moistMin: req.body.minRange,
    userId: req.body.userId,
  };

  try {
    const dataToSave = await SOILRANGE.findOneAndUpdate(
      { userId: req.body.userId },
      {
        $set: body,
      },
      { upsert: true }
    );
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get Soil moisture Range Data
router.get("/saveSoilRange", async (req, res) => {
  try {
    const data = await SOILRANGE.findOne();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Data from DHTS
router.get("/dht",async (req, res) => {
  try {
    const data = await DHT.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Data from led
router.get("/leds",async (req, res) => {
  try {
    const data = await LED.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;


// //Post Method
// router.post("/post", (req, res) => {
//   res.send("Post API");
// });

// //Get all Method
// router.get("/getAll", (req, res) => {
//   res.send("Get All API");
// });

// //Get by ID Method
// router.get("/getOne/:id", (req, res) => {
//   res.send(req.params.id);
// });

// //Update by ID Method
// router.patch("/update/:id", (req, res) => {
//   res.send("Update by ID API");
// });

// //Delete by ID Method
// router.delete("/delete/:id", (req, res) => {
//   res.send("Delete by ID API");
// });