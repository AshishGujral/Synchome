import express, { response } from "express";
import axios from "axios";
import fetch from "node-fetch";
import LED from "../models/Led.js";
import DHT from "../models/DHT.js";
import MOTION from "../models/Motion.js";
import RANGE from "../models/Range.js";

const router = express.Router();

//Manage LED
router.post("/manageLed", async (req, res) => {
  const body = {
    name: req.body.name,
    mode: req.body.mode,
    status: req.body.status,
  };

  const response = await fetch("http://192.168.147.28/handleLED", {
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

//Manage DHT(Temperature and Humidity)
router.post("/manageDHT", async (req, res) => {
  const response = await fetch("http://192.168.147.28/handleDHT");

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

//Manage Motion
router.post("/manageMotion", async (req, res) => {
  const body = {
    status: req.body.status,
  };

  const response = await fetch("http://192.168.147.28/handleMotion", {
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

//Save Temperature and humidity Range Data
router.put("/saveRange", async (req, res) => {
  const body = {
    tempMax: parseInt(req.body.tempVal),
    tempMin: parseInt(req.body.humVal),
    time: Date.now(),
    humMax: parseInt(req.body.minRange),
    humMin: parseInt(req.body.maxRange),
    userId: req.body.userId,
  };

//   const data = new RANGE(body);

  try {
    const dataToSave = await RANGE.findOneAndUpdate(
      {userId: req.body.userId,},
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

//Post Method
router.post("/post", (req, res) => {
  res.send("Post API");
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send(req.params.id);
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

export default router;
