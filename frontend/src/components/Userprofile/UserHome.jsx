import "./Userhome.css";

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
import Userprofile from "./Userprofile";

const SidebarGrid = styled(Grid)`
  max-width: 10%;
`;
const ContainerGrid = styled(Grid)`
  justify-content: center;
  width: 100%;
`;
const UserHome = () => {
  return (
    <>
      <ContainerGrid container spacing={2} justifyContent="flex-start">
        <SidebarGrid item xs={1}>
          <Sidebar />
        </SidebarGrid>
        <Userprofile />
      </ContainerGrid>
    </>
  );
};

export default UserHome;
