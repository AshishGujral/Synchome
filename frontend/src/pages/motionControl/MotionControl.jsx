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

  const [secData, setSecData] = useState([]);

  const [tempData, setTempData] = useState([]);
  const loadSwitchState = () => {
    const switchOneStatus = localStorage.getItem("Motion");
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
        "http://localhost:3000/backend/routes/motion",
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
        const status = item.status;
        console.log("Status", status);
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
            status: item.status,
          };
        } else {
          groupedData[date].status = item.status;
        }
      });
      setTempData(secData);
      console.log("temp", secData);
    };

    fetchData();
  }, [secData]);
  // get data from localstorage when page reloads
  window.addEventListener("load", loadSwitchState);

  useEffect(() => {
    loadSwitchState();
  });

  const switchToggleOne = async () => {
    setValueOne(!valueOne);
    console.log("Button clicked");
    const status = valueOne ? "OFF" : "ON";
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
                      icon: <TrackChangesIcon />,
                      handleChange: switchToggleOne,
                      color: "#7a40f2",
                    },
                  ]}
                />
              </div>
              <div className="water__chartInfo">
                <div className="water__powerConsumed">
                <ChartExpense tempData={tempData} />
                </div>
              </div>
              <div className="water__info" id="water__info">
                <label for="water__info">Location: </label>
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

      <TopbarGrid className="rightColumn" item xs={3}></TopbarGrid>
    </ContainerGrid>
  );
};

export default MotionControl;