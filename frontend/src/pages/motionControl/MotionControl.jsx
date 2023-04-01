import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import ChartExpense from "../../components/ChartExpense/ChartExpense";

import ForestIcon from "@mui/icons-material/Forest";
import { Grid, styled } from "@mui/material";

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
const infoData = [{
    deviceId:1,
    time : 3.4,
    accessedBy : "Amy",
    waterConsumed: 2.5,
}]

const MotionControl = () => {
  return (
    <ContainerGrid container spacing={2} justifyContent="flex-start">
    <SidebarGrid item xs={1}>
      <Sidebar />
    </SidebarGrid>
    {/* ---------------------------------------------------------- */}
    <MainGrid item className="water__herosection" xs={8}>
    {
      infoData.map(({time, accessedBy, waterConsumed}) => {
          return (
              <div className="water__wrapper">
              <div className="water__switches">
                <FourColumnDiv
                  switches={[{ name: "Yard", state: false, icon: <ForestIcon /> }]}
                />
              </div>
              <div className="water__chartInfo">
                <div className="water__powerConsumed">
                  <ChartExpense />
                </div>
              </div>
              <div className="water__info" id="water__info">
                <label for="water__info">Yard</label>
                <h4>Last triggred:</h4>
                {/* insert data */}
                <h5>{`${time}hrs ago`}</h5>
                <h4>Total triggres this received this week:</h4>
                <h5>{`${waterConsumed} Liters`}</h5>
              </div>
            </div>
          );
      })
    }
    </MainGrid>
    {/* ----------------------------------------------- */}

    <TopbarGrid className="rightColumn" item xs={3}>
      <Topbar />
    </TopbarGrid>
  </ContainerGrid>
);
  
}

export default MotionControl