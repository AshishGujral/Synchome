import { Add, Bloodtype } from "@mui/icons-material";
import { fontSize, fontWeight } from "@mui/system";
import { Grid, Typography, styled } from "@mui/material";
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
  const [sensorData, setSensorData] = useState("");

  useEffect(() => {
    const getTempAndHum = async () => {
      const res = await axios.get("/api/routes/manageDHT");
      setSensorData(res.data);
    };
    getTempAndHum();
  },[]);

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
  {
    return (
      <div>
        <div className="M">AC Control</div>
        <div>
          <FourColumnDiv
            switches={[
              { name: "Kitchen", state: false, icon: <KitchenIcon /> },
              { name: "Hall", state: false, icon: <HallIcon /> },
              { name: "Basement", state: false, icon: <BasementIcon /> },
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
              <Box sx={{ width: 300, display: "flex", gap:"1em" }}>
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
              <label for="controls">Hall</label>
              <IconButton size="large" className="addIcon">
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="controls-content-content">38°C</div>
              <IconButton size="large" className="removeIcon">
                <RemoveIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AcControlMain;
