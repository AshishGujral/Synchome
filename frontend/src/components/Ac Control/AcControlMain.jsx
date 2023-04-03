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

  const [tempValue, setTempValue] = React.useState([20, 37]);
  const [humValue, setHumValue] = React.useState([20, 37]);
  const [fanSpeed, setFanSpeed] = React.useState("a");

  const [sensorData, setSensorData] = useState("");
  const [nameOne, setNameOne] = useState("Kitchen");
  const [valueOne, setValueOne] = useState(false);
  const [nameTwo, setNameTwo] = useState("Hall");
  const [valueTwo, setValueTwo] = useState(false);
  const [nameThree, setNameThree] = useState("Basement");
  const [valueThree, setValueThree] = useState(false);

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";
    console.log("Kitchen ", status);
    /* try {
      await axios.post("/api/routes/manageLed", {
        name: nameOne,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }*/
  };
  const switchToggleTwo = async () => {
    setValueTwo(!valueTwo);

    const status = valueTwo ? "OFF" : "ON";
    console.log("Hall ", status);
    /* try {
      await axios.post("/api/routes/manageLed", {
        name: nameOne,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }*/
  };
  const switchToggleThree = async () => {
    setValueThree(!valueThree);

    const status = valueThree ? "OFF" : "ON";
    console.log("Basement ", status);
    /* try {
      await axios.post("/api/routes/manageLed", {
        name: nameOne,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }*/
  };

  // get temperature and humidity data from sensor
  useEffect(() => {
    const getTempAndHum = async () => {
      const res = await axios.post("/api/routes/manageDHT", {
        userId: user._id,
      });
      setSensorData(res.data);
    };
    getTempAndHum();
  }, []);

  // control fan speed
  const handleChange3 = (event) => {
    setFanSpeed(event.target.value);
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
              {
                name: nameTwo,
                state: valueTwo,
                icon: <HallIcon />,
                handleChange: switchToggleTwo,
                color: "#7a40f2",
              },
              {
                name: nameThree,
                state: valueThree,
                icon: <BasementIcon />,
                handleChange: switchToggleThree,
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
                    checked={fanSpeed === "a"}
                    onChange={handleChange3}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div className="radio__ac">
                  <label>Two</label>
                  <Radio
                    checked={fanSpeed === "b"}
                    onChange={handleChange3}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
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
