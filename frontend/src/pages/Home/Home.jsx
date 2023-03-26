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
  border: 1px solid red;
`;



const Home = () => {
  return (
    <>
      <ContainerGrid container spacing={1} justifyContent="flex-start">
        <SidebarGrid item xs={1}>
          <Sidebar />
        </SidebarGrid>

        <MainGrid className="heroSection" item xs={8}>
          <Main />
          <FourColumnDiv
            switches={[
              { name: "Water Pump", state: false, icon:<WaterPumpIcon/>},
              { name: "Temperature", state: false , icon:<TemperatureIcon/>},
              { name: "Motion Sensor", state: false , icon:<MotionSensor/>},
              { name: "Lights", state: false, icon:<LightIcon/> },
            ]}
          />
        </MainGrid>

        <TopbarGrid className="rightColumn" item xs={3}>
          <Topbar />
          <Userlist />
          <div className="chart">
          <ChartExpense />
          </div>
       
        </TopbarGrid>
      </ContainerGrid>
    </>
  );
};

export default Home;
