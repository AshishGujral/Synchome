import "./home.css";

import { dividerClasses, Grid, styled } from "@mui/material";
// import { styled } from '@mui/system';
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Main from "../../components/main/Main";
import { Context } from "../../context/Context";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import Userlist from "../../components/Userslist/Userlist";
import ChartExpense from "../../components/ChartExpense/ChartExpense";
import { containerClasses } from "@mui/system";
import WaterPumpIcon from "@mui/icons-material/Opacity";
import TemperatureIcon from "@mui/icons-material/DeviceThermostat";
import LightIcon from "@mui/icons-material/TipsAndUpdates";
import MotionSensor from "@mui/icons-material/DirectionsRun";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
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

const Home = () => {
  const { user } = useContext(Context);

  const [nameOne, setNameOne] = useState("Water Pump");
  const [valueOne, setValueOne] = useState(false);

  const [nameTwo, setNameTwo] = useState("Temperature");
  const [valueTwo, setValueTwo] = useState(false);

  const [nameThree, setNameThree] = useState("Motion Sensor");
  const [valueThree, setValueThree] = useState(false);

  const [nameFour, setNameFour] = useState("Lights");
  const [valueFour, setValueFour] = useState(false);
  const [tempData, setTempData] = useState([]);
  const loadSwitchState = () => {
    const switchOneStatus = localStorage.getItem("Water");
    const switchTwoStatus = localStorage.getItem("Fan");
    const switchThreeStatus = localStorage.getItem("Motion");
    const switchAllStatus = localStorage.getItem("all");
    if (switchOneStatus === "ON") {
      setValueOne(true);
    } else {
      setValueOne(false);
    }
    if (switchTwoStatus == "ON") {
      setValueTwo(true);
    } else {
      setValueFour(false);
    }
    if (switchThreeStatus == "ON") {
      setValueThree(true);
    } else {
      setValueThree(false);
    }
    if (switchAllStatus == "ON") {
      setValueFour(true);
    } else {
      setValueFour(false);
    }
  };
  // get data from localstorage when page reloads
  window.addEventListener("load", loadSwitchState);

  useEffect(() => {
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
          const dateNew = new Date(date);
          groupedData[date] = {
            date: dateNew.toDateString(),
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
    };
    fetchData();
  }, []);

  useEffect(() => {
    loadSwitchState();
  });
  const switchToggleOne = async () => {
    setValueOne(!valueOne);
    const status = valueOne ? "OFF" : "ON";
    localStorage.setItem("Water", status);
    try {
      await axios.post("/api/routes/manageSoilLed", {
        ledStatus: status,
        userId: user._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const switchToggleTwo = async () => {
    setValueTwo(!valueTwo);

    const status = valueTwo ? "OFF" : "ON";
    localStorage.setItem("Fan", status);
    console.log("Button clicked", status, "two");
    try {
      await axios.post("/api/routes/manageFan", {
        userId: user._id,
        speed: 1,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const switchToggleThree = async () => {
    setValueThree(!valueThree);

    const status = valueThree ? "OFF" : "ON";
    localStorage.setItem("Motion", status);
    try {
      await axios.post("/api/routes/manageMotion", {
        userId: user._id,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const switchToggleFour = async () => {
    setValueFour(!valueFour);

    const status = valueFour ? "OFF" : "ON";
    localStorage.setItem("red", status);
    localStorage.setItem("green", status);
    localStorage.setItem("blue", status);
    localStorage.setItem("all", status);
    try {
      await axios.post("/api/routes/manageLed", {
        userId: user._id,
        name: "all",
        mode: "normal",
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ContainerGrid container spacing={2} justifyContent="flex-start">
        <SidebarGrid item xs={1}>
          <Sidebar />
        </SidebarGrid>

        <MainGrid item className="heroSection" xs={8}>
          <Main />
          <FourColumnDiv
            switches={[
              {
                name: nameOne,
                state: valueOne,
                icon: <WaterPumpIcon />,
                handleChange: switchToggleOne,
                color: "#7a40f2",
              },
              {
                name: nameTwo,
                state: valueTwo,
                icon: <TemperatureIcon />,
                handleChange: switchToggleTwo,
                color: "#7a40f2",
              },
              {
                name: nameThree,
                state: valueThree,
                icon: <MotionSensor />,
                handleChange: switchToggleThree,
                color: "#7a40f2",
              },
              {
                name: nameFour,
                state: valueFour,
                icon: <LightIcon />,
                handleChange: switchToggleFour,
                color: "#7a40f2",
              },
            ]}
          />
        </MainGrid>

        <TopbarGrid className="rightColumn" item xs={3}>
          <Userlist />
          <div className="chart">
            <ChartExpense tempData={tempData} />
          </div>
        </TopbarGrid>
      </ContainerGrid>
    </>
  );
};

export default Home;
