import { Add, Bloodtype } from "@mui/icons-material";
import { fontSize, fontWeight } from "@mui/system";
import {
  Grid,
  Typography,
  styled,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import React, { Component, useState, useContext } from "react";
import ChartExpense from "../ChartExpense/ChartExpense";
import FourColumnDiv from "../main/FourColumnDiv";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HallIcon from "@mui/icons-material/Weekend";
import BasementIcon from "@mui/icons-material/MeetingRoom";
import "./AcControlMain.css";
import { useEffect } from "react";
import { Context } from "../../context/Context";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";

const ContainerGrid = styled(Grid)`
  justify-content: center;
  width: 100%;
`;

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

const AcControlMain = () => {
  const { user } = useContext(Context);

  const [tempValue, setTempValue] = React.useState([19, 29]);
  const [humValue, setHumValue] = React.useState([19, 29]);

  const [fanSpeed, setFanSpeed] = React.useState(1);
  const [fanStatus, setFanStatus] = useState("OFF");

  const [sensorData, setSensorData] = useState("");
  const [nameOne, setNameOne] = useState("Kitchen");
  const [valueOne, setValueOne] = useState(false);
  const [tempData, setTempData] = useState([]);

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";
    // setFanStatus(status);
    // console.log("Kitchen ", status);
    // await callFan();
    try {
      await axios.post("/api/routes/manageFan", {
        userId: user._id,
        speed: fanSpeed,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // turn fan on/off
  const callFan = async () => {
    await axios.post("/api/routes/manageFan", {
      userId: user._id,
      speed: fanSpeed,
      status: fanStatus,
    });
  };

  // get temperature and humidity data from sensor
  const getTempAndHum = async () => {
    const res = await axios.post("/api/routes/manageDHT", {
      userId: user._id,
    });
    setSensorData(res.data);
  };

  const setTempAndHumRange = async () => {
    const res = await axios.get("api/routes/saveRange");
    setTempValue([res.data.tempMin, res.data.tempMax]);
    setHumValue([res.data.humMin, res.data.humMax]);
  };

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      "http://localhost:3000/backend/routes/dht",
      { headers }
    );
    const data = response.data;

    /*const currentDate = new Date();
    const before = new Date();
    before.setDate(currentDate.getDate() - 5);*/

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.time.substr(0, 10)); // extract date portion
      return itemDate.toISOString().substr(0, 10); //>= before.toISOString().substr(0,10) && itemDate.toISOString().substr(0,10) <= currentDate.toISOString().substr(0,10);
    });

    const groupedData = {};

    filteredData.forEach((item) => {
      const date = item.time.substr(0, 10);
      if (!groupedData[date]) {
        groupedData[date] = {
          date: date,
          temp: item.temperature,
          humi: item.humidity,
        };
      } else {
        groupedData[date].temp = item.temperature;
        groupedData[date].humi = item.humidity;
      }
    });
    const aggregatedData = Object.values(groupedData);
    setTempData(aggregatedData);
    console.log("aggreagte", aggregatedData);
  };

  useEffect(() => {
    fetchData();
    //getTempAndHum(); // from sensor
    setTempAndHumRange(); // from DB
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      // console.log("Logs every 10 seconds");
      // console.log(
      //   "max temp val" + tempValue[1] + "min temp val" + tempValue[0]
      // );
      // console.log("max hum val" + humValue[1] + "min temp val" + humValue[0]);
      getTempAndHum();
      // await getTempAndHum();
      try {
        const res = await axios.post("/api/routes/manageDHT", {
          userId: user._id,
        });
        setSensorData(res.data);
      } catch (err) {
        console.log(err);
      }
      if (
        (tempValue[0] <= parseInt(sensorData.temperature) &&
          parseInt(sensorData.temperature) <= tempValue[1]) ||
        (humValue[0] <= parseInt(sensorData.humidity) &&
          parseInt(sensorData.humidity) <= humValue[1])
      ) {
        // console.log("calling if fan api");
        setFanStatus("ON");
        localStorage.setItem("Fan", "ON");
        console.log(fanStatus);
        // await callFan();
        try {
          await axios.post("/api/routes/manageFan", {
            userId: user._id,
            speed: fanSpeed,
            status: "ON",
          });
        } catch (err) {
          console.log(err);
        }
        setValueOne(true);
      } else {
        setFanStatus("OFF");
        localStorage.setItem("Fan", "OFF");
        // console.log(fanStatus);

        // console.log("calling else fan api");

        try {
          await axios.post("/api/routes/manageFan", {
            userId: user._id,
            speed: fanSpeed,
            status: "OFF",
          });
        } catch (err) {
          console.log(err);
        }
        setValueOne(false);
      }
    }, 10000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [
    tempValue[1],
    tempValue[0],
    humValue[0],
    humValue[1],
    valueOne,
    sensorData,
  ]);

  // control fan speed
  const handleChange3 = (event) => {
    setFanSpeed(parseInt(event.target.value));
  };

  // slider helper functions
  const handleTempChange = async (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setTempValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setTempValue([clamped - minDistance, clamped]);
      }
    } else {
      setTempValue(newValue);
    }

    try {
      await axios.put("/api/routes/saveRange", {
        tempMax: tempValue[1],
        tempMin: tempValue[0],
        humMin: humValue[0],
        humMax: humValue[1],
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleHumidityChange = async (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setHumValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setHumValue([clamped - minDistance, clamped]);
      }
    } else {
      setHumValue(newValue);
    }

    try {
      await axios.put("/api/routes/saveRange", {
        tempMax: tempValue[1],
        tempMin: tempValue[0],
        humMin: humValue[0],
        humMax: humValue[1],
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  {
    return (
      <div>
        <div className="M">AC Control</div>
        <div>
          <FourColumnDiv
            switches={[
              {
                name: nameOne,
                state: valueOne,
                icon: <KitchenIcon />,
                handleChange: switchToggleOne,
                color: "#7a40f2",
              },
            ]}
          />
        </div>
        <div className="Ac-Main">
          <div className="Power-Consumed">
            Power Consumed
            <div className="power-content">
              {" "}
              <ChartExpense tempData={tempData} />
            </div>
          </div>
          <div className="Controls">
            Controls
            <div className="controls-content" id="controls">
              <Box sx={{ width: 300, display: "flex", gap: "1em" }}>
                <Typography variant="h5">{tempValue[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={tempValue}
                  onChange={handleTempChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
                <Typography variant="h5">{tempValue[1]}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">
                  Indoor Temperature:{sensorData.temperature}°C
                </Typography>
              </Box>
            </div>
            <div className="controls-content" id="controls">
              <Box sx={{ width: 300, display: "flex", gap: "1em" }}>
                <Typography variant="h5">{humValue[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={humValue}
                  onChange={handleHumidityChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
                <Typography variant="h5">{humValue[1]}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">
                  Indoor Humidity: {sensorData.humidity}%
                </Typography>
              </Box>
            </div>
            <div className="controls-content" id="controls">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Fan Speed
                </FormLabel>
                <div className="radio__ac">
                  <label>One</label>
                  <Radio
                    checked={fanSpeed == 1}
                    onChange={handleChange3}
                    value={1}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div className="radio__ac">
                  <label>Two</label>
                  <Radio
                    checked={fanSpeed == 2}
                    onChange={handleChange3}
                    value={2}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                  />
                </div>
                <div className="radio__ac">
                  <label>Three</label>
                  <Radio
                    checked={fanSpeed == 3}
                    onChange={handleChange3}
                    value={3}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "C" }}
                  />
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AcControlMain;