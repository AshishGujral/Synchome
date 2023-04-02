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
import React, { Component, useState } from "react";
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

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const ContainerGrid = styled(Grid)`
  justify-content: center;
  width: 100%;
`;

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

const AcControlMain = () => {
  const [value2, setValue2] = React.useState([20, 37]);
  const [value1, setValue1] = React.useState([20, 37]);
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
    console.log("Kitchen ",status);
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
    console.log("Hall ",status);
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
    console.log("Basement ",status);
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

  useEffect(() => {
    const getTempAndHum = async () => {
      const res = await axios.post("/api/routes/manageDHT", {
        userId: user._id,
      });
      setSensorData(res.data);
    };
    getTempAndHum();
  }, []);

  const handleChange3 = (event) => {
    setFanSpeed(event.target.value);
  };

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue1([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue1([clamped - minDistance, clamped]);
      }
    } else {
      setValue1(newValue);
    }
  };
  {
    return (
      <div>
        <div className="M">AC Control</div>
        <div>
        <FourColumnDiv
            switches={[
              { name: nameOne, state: valueOne, icon:<KitchenIcon/>,handleChange: switchToggleOne, color:'#7a40f2'},
              { name: nameTwo, state: valueTwo, icon:<HallIcon/>,handleChange: switchToggleTwo, color:'#7a40f2'},
              { name: nameThree, state: valueThree, icon:<BasementIcon/>,handleChange: switchToggleThree, color:'#7a40f2'},
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
                <Typography variant="h5">{value2[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={value2}
                  onChange={handleChange2}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
                <Typography variant="h5">{value2[1]}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Indoor Temperature</Typography>
              </Box>
            </div>
            <div className="controls-content" id="controls">
              <Box sx={{ width: 300, display: "flex", gap: "1em" }}>
                <Typography variant="h5">{value1[0]}</Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  value={value1}
                  onChange={handleChange1}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
                <Typography variant="h5">{value1[1]}</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Indoor Humidity</Typography>
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
