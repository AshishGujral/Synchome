import { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import ChartExpense from "../../components/ChartExpense/ChartExpense";
import axios from "axios";
import { Context } from "../../context/Context";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
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
const infoData = [
  {
    deviceId: 1,
    time: 3.4,
    accessedBy: "Amy",
    waterConsumed: 2.5,
  },
];

const MotionControl = () => {
  const { user } = useContext(Context);

  const [nameOne, setNameOne] = useState("Kitchen");
  const [valueOne, setValueOne] = useState(false);

  const switchToggleOne = async () => {
    setValueOne(!valueOne);
    console.log("Button clicked");
    const status = valueOne ? "OFF" : "ON";

    try {
      await axios.post("/api/routes/manageMotion", {
        userId: user._id,
        status: status,
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
        {infoData.map(({ time, accessedBy, waterConsumed, deviceId }) => {
          return (
            <div className="water__wrapper" key={deviceId}>
              <div className="water__switches">
                <FourColumnDiv
                  switches={[
                    {
                      name: nameOne,
                      state: valueOne,
                      icon: <TrackChangesIcon />,
                      handleChange: switchToggleOne,
                      color: "#7a40f2",
                    },
                  ]}
                />
              </div>
              <div className="water__chartInfo">
                <div className="water__powerConsumed">
                  {/* <ChartExpense /> */}
                </div>
              </div>
              <div className="water__info" id="water__info">
                <label htmlFor="water__info">Location: </label>
                <h4>Last triggred:</h4>
                {/* insert data */}
                <h5>{`${time}hrs ago`}</h5>
                <h4>Total triggres this received this week:</h4>
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

export default MotionControl;
