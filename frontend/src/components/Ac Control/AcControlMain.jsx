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

  useEffect(() => {
    getTempAndHum();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("Logs every 10 seconds");
      console.log("temp val" + tempValue[1]);
      console.log("hum val" + humValue[1]);

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
        tempValue[1] >= sensorData.temperature ||
        humValue[1] >= sensorData.humidity
      ) {
        console.log("calling if fan api");
        setFanStatus("ON");
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
        // setFanStatus("OFF");
        // await callFan();
        console.log("calling else fan api");

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
  }, [tempValue[1], humValue[1]]);

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
              <ChartExpense />
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
                  Indoor Temperature:{sensorData.temperature}
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
                  Indoor Humidity: {sensorData.humidity}
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
