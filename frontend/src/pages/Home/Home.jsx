import "./home.css";

import { dividerClasses, Grid, styled } from "@mui/material";
// import { styled } from '@mui/system';
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Main from "../../components/main/Main";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import Userlist from "../../components/Userslist/Userlist";
import ChartExpense from "../../components/ChartExpense/ChartExpense";
import { containerClasses } from "@mui/system";
import WaterPumpIcon from '@mui/icons-material/Opacity';
import TemperatureIcon from '@mui/icons-material/DeviceThermostat'
import LightIcon from '@mui/icons-material/TipsAndUpdates'
import MotionSensor from '@mui/icons-material/DirectionsRun'
import { useEffect, useState } from "react";
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

  const [nameOne, setNameOne] = useState("Water Pump");
  const [valueOne, setValueOne] = useState(false);

  const [nameTwo, setNameTwo] = useState("Temperature");
  const [valueTwo, setValueTwo] = useState(false);

  const [nameThree, setNameThree] = useState("Motion Sensor");
  const [valueThree, setValueThree] = useState(false);

  const [nameFour, setNameFour] = useState("Lights");
  const [valueFour, setValueFour] = useState(false);

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";

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
    console.log("Button clicked", status, "two");
    /*try {
      await axios.post("/api/routes/manageLed", {
        name: nameTwo,
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

    /*try {
      await axios.post("/api/routes/manageLed", {
        name: nameThree,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }*/
  };
  const switchToggleFour = async () => {
    setValueFour(!valueFour);

    const status = valueFour ? "OFF" : "ON";

    try {
      await axios.post("/api/routes/manageLed", {
        name: nameFour,
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
              { name: nameOne, state: valueOne, icon:<WaterPumpIcon/>,handleChange: switchToggleOne, color:'#7a40f2',},
              { name: nameTwo, state: valueTwo , icon:<TemperatureIcon/>,handleChange: switchToggleTwo, color:'#7a40f2',},
              { name: nameThree, state: valueThree, icon:<MotionSensor/>,handleChange: switchToggleThree, color:'#7a40f2',},
              { name: nameFour, state: valueFour, icon:<LightIcon/> ,handleChange: switchToggleFour, color:'#7a40f2',},
            ]}
          />
        </MainGrid>

        <TopbarGrid className="rightColumn" item xs={3}>
          <Userlist />
          <div className="chart">
          {/*<ChartExpense />*/}
          </div>
       
        </TopbarGrid>
      </ContainerGrid>
    </>
  );
};

export default Home;
