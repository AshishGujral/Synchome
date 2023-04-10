import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import ChartExpense from "../../components/ChartExpense/ChartExpense";
import "./watercontrol.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
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

const minDistance = 10;

const WaterControl = () => {
  // switch states
  const [nameOne, setNameOne] = useState("Yard");
  const [valueOne, setValueOne] = useState(false);

  const [ledStatus, setLedStatus] = useState("OFF")
// slider states
  const [moistValue, setmoistValue] = React.useState([20, 37]);
// sensor data states
  const [sensorData, setSensorData] = useState("");
  // user from context
  const { user } = useContext(Context);

  const [secData, setSecData] = useState([]);

  const [tempData, setTempData] = useState([]);

  const loadSwitchState = () => {
    const switchOneStatus = localStorage.getItem("Water");
    if (switchOneStatus === "ON") {
      setValueOne(true);
    } else {
      setValueOne(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "http://localhost:3000/backend/routes/soil",
        { headers }
      );
      const data = response.data;
      function updateRemainingSecs(prevSecs, newSec) {
        const existingSecs = prevSecs.find((sec) => sec.date === newSec.date);
        if (existingSecs) {
          existingSecs.seconds += newSec.seconds;
        } else {
          prevSecs.push(newSec);
        }
        return prevSecs;
      }

      const groupedData = {};
      let ondate = 0;
      let offdate = 0;
      data.forEach((item) => {
        const date = item.time;
        const newDate = new Date(date);
        const status = item.ledStatus;
        if (status == "ON") {
          ondate = newDate;
        } else {
          offdate = newDate;
          if (ondate && offdate) {
            const remainingMs = offdate.getTime() - ondate.getTime();
            if (remainingMs > 0) {
              const remainingSec = Math.floor(remainingMs / 1000);
              setSecData((prevSecs) =>
                updateRemainingSecs(prevSecs, {
                  seconds: remainingSec,
                  date: offdate.toDateString(),
                })
              );
            } else {
              console.log("sec", 0);
            }
          }
        }
        if (!groupedData[date]) {
          groupedData[date] = {
            date: date,
            status: item.ledStatus,
          };
        } else {
          groupedData[date].status = item.ledStatus;
        }
      });
      setTempData(secData);
    };

    fetchData();
  }, [secData]);
  // get data from localstorage when page reloads
  window.addEventListener("load", loadSwitchState);

  useEffect(() => {
    loadSwitchState();
  });

  const handleMoistChange = async (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setmoistValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setmoistValue([clamped - minDistance, clamped]);
      }
    } else {
      setmoistValue(newValue);
    }

    try {
      // TODO 
      await axios.put("/api/routes/saveSoilRange", {
        moistMax: moistValue[1],
        moistMin: moistValue[0],
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get moisture data from sensor
  const getMoistFromSensor = async () => {
    // TODO 
    const res = await axios.post("/api/routes/manageSoil", {
      userId: user._id,
    });
    setSensorData(res.data);
  };

  // set Moisture Range from DB
  const setMoistRange = async () => {
    // TODO 
    const res = await axios.get("api/routes/saveSoilRange");
    setMoistValue([res.data.moistMin, res.data.moistMax]);
  };

  useEffect(() => {
  setMoistRange();
    // getMoistFromSensor();
  }, []);

  // TODO check moisture value in set range and turn water led
  useEffect(() => {
    const interval = setInterval(async () => {
      getMoistFromSensor();
      // await getMoistFromSensor();
      try {
        const res = await axios.post("/api/routes/manageSoil", {
          userId: user._id,
        });
        setSensorData(res.data);
      } catch (err) {
        console.log(err);
      }
      if (
        moistValue[0] <= parseInt(sensorData.moisture) &&
        parseInt(sensorData.moisture) <= moistValue[1]
      ) {
        console.log("calling if led soil api");
        setLedStatus("ON");
        // await callFan();
        try {
          await axios.post("/api/routes/manageSoilLed", {
            userId: user._id,
            status: "ON",
          });
        } catch (err) {
          console.log(err);
        }
        setValueOne(true);
      } else {
        setLedStatus("OFF");
        try {
          await axios.post("/api/routes/manageSoilLed", {
            userId: user._id,
            status: "OFF",
          });
        } catch (err) {
          console.log(err);
        }
        setValueOne(false);
      }
    }, 10000);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    },
    [moistValue[1], moistValue[0], valueOne, sensorData],
    
  );

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";
    // TODO
    try {
      await axios.post("/api/routes/manageSoilLed", {
        ledStatus: status,
        userId: user.user._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContainerGrid container spacing={2} justifyContent="flex-start">
      <SidebarGrid item xs={1}>
        <Sidebar />
      </SidebarGrid>
      {/* ---------------------------------------------------------- */}
      <MainGrid item className="water__herosection" xs={8}>
        {infoData.map(({ time, accessedBy, waterConsumed,deviceId}) => {
          return (
            <div className="water__wrapper" key={deviceId} >
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
                <div className="Controls" >
                  Controls
                  <div className="controls-content" id="controls">
                    <Box sx={{ width: 300, display: "flex", gap: "1em" }}>
                      <Typography variant="h5">{moistValue[0]}</Typography>
                      <Slider
                        getAriaLabel={() => "Minimum distance shift"}
                        onChange={handleMoistChange}
                        value={moistValue}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                      />
                      <Typography variant="h5">{moistValue[1]}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        Moisture:{sensorData.moisture}
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
                <label htmlFor="water__info">Yard</label>
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
      </TopbarGrid>
    </ContainerGrid>
  );
};

export default WaterControl;
