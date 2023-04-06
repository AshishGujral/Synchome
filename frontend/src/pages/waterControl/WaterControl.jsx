import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import ChartExpense from "../../components/ChartExpense/ChartExpense";
import "./watercontrol.css";
import axios from "axios";
import React, { Component, useState, useContext } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import ForestIcon from "@mui/icons-material/Forest";
import { Grid, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect } from "react";
const SidebarGrid = styled(Grid)`
  max-width: 10%;
`;
const TopbarGrid = styled(Grid)`
  right: 0;
  top: 0;
  float: right;
`;
const ContainerGrid = styled(Grid)`
  justify-content: center;
  width: 100%;
`;
const MainGrid = styled(Grid)`
  padding-left: 2vw;
`;
// fake data for info box
const infoData = [
  {
    deviceId: 1,
    time: 3.4,
    accessedBy: "Amy",
    waterConsumed: 2.5,
  },
];

// slider helper functions

function valuetext(value) {
  return `${value}°C`;
}

const WaterControl = () => {
  const [nameOne, setNameOne] = useState("Yard");
  const [tempValue, setTempValue] = React.useState([20, 37]);
  const [valueOne, setValueOne] = useState(false);

  const [sensorData, setSensorData] = useState("");

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

  // get temperature data from sensor
  useEffect(() => {
    const getTempAndHum = async () => {
      const res = await axios.post("/api/routes/manageDHT", {
        userId: user._id,
      });
      setSensorData(res.data);
    };
    getTempAndHum();
  }, []);

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";
    console.log("yard ", status);
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

  return (
    <ContainerGrid container spacing={2} justifyContent="flex-start">
      <SidebarGrid item xs={1}>
        <Sidebar />
      </SidebarGrid>
      {/* ---------------------------------------------------------- */}
      <MainGrid item className="water__herosection" xs={8}>
        {infoData.map(({ time, accessedBy, waterConsumed }) => {
          return (
            <div className="water__wrapper">
              <div className="water__switches">
                <FourColumnDiv
                  switches={[
                    {
                      name: nameOne,
                      state: valueOne,
                      icon: <ForestIcon />,
                      handleChange: switchToggleOne,
                      color: "#7a40f2",
                    },
                  ]}
                />
                <div className="Controls">
                  Controls
                  <div className="controls-content" id="controls">
                    <Box sx={{ width: 300, display: "flex", gap: "1em" }}>
                      <Typography variant="h5">{tempValue[0]}</Typography>
                      <Slider
                        getAriaLabel={() => "Minimum distance shift"}
                        onChange={handleTempChange}
                        value={tempValue}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                      />
                      <Typography variant="h5">{tempValue[1]}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        Humidity:{sensorData.humidity}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
              <div className="water__chartInfo">
                <div className="water__powerConsumed">
                  {/*<ChartExpense />*/}
                </div>
              </div>
              <div className="water__info" id="water__info">
                <label for="water__info">Yard</label>
                <h4>Last watered:</h4>
                {/* insert data */}
                <h5>{`${time}hrs ago by ${accessedBy}`}</h5>
                <h4>Water received this week:</h4>
                <h5>{`${waterConsumed} Liters`}</h5>
              </div>
            </div>
          );
        })}
      </MainGrid>
      {/* ----------------------------------------------- */}

      <TopbarGrid className="rightColumn" item xs={3}>
        <Topbar />
      </TopbarGrid>
    </ContainerGrid>
  );
};

export default WaterControl;
