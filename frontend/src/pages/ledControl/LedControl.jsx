import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import SwitchContainer from "../../components/Switch/SwitchContainer";
import LightIcon from "@mui/icons-material/TipsAndUpdates";
import "./ledcontrol.css";
import FourColumnDiv from "../../components/main/FourColumnDiv";

import {
  Grid,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

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

const LedControl = () => {
  const { user } = useContext(Context);

  const [mode, setMode] = useState("NORMAL");

  const [nameOne, setNameOne] = useState("red");
  const [valueOne, setValueOne] = useState(false);

  const [nameTwo, setNameTwo] = useState("green");
  const [valueTwo, setValueTwo] = useState(false);

  const [nameThree, setNameThree] = useState("blue");
  const [valueThree, setValueThree] = useState(false);

  const [valueAll, setValueAll] = useState(false);
  const handleSelectChange = (event) => {
    setMode(event.target.value);
  };

  useEffect(() => {
    if (mode === "BLINK" || mode === "NORMAL") {
      let status = "";
      if (valueOne) {
        status = valueOne ? "OFF" : "ON";
        (async () => {
          try {
            await axios.post("/api/routes/manageLed", {
              userId: user._id,
              name: nameOne,
              mode: mode,
              status: status,
            });
          } catch (err) {
            console.log(err);
          }
        })();
      }
      if (valueTwo) {
        status = valueTwo ? "OFF" : "ON";
        (async () => {
          try {
            await axios.post("/api/routes/manageLed", {
              userId: user._id,
              name: nameTwo,
              mode: mode,
              status: status,
            });
          } catch (err) {
            console.log(err);
          }
        })();
      }
      if (valueThree) {
        status = valueThree ? "OFF" : "ON";
        (async () => {
          try {
            await axios.post("/api/routes/manageLed", {
              userId: user._id,
              name: nameThree,
              mode: mode,
              status: status,
            });
          } catch (err) {
            console.log(err);
          }
        })();
      }
      if (valueAll) {
        status = valueAll ? "OFF" : "ON";
        (async () => {
          try {
            await axios.post("/api/routes/manageLed", {
              userId: user._id,
              name: "all",
              mode: mode,
              status: status,
            });
          } catch (err) {
            console.log(err);
          }
        })();
      }
    }
  }, [mode, valueOne, valueTwo, valueThree, valueAll]);

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";
    // check if any switch off call switchtoggleall
    // check if any switch off call switchtoggleall
    if (status == "OFF" && valueAll == true) {
      switchToggleAll();
      setValueTwo(true);
      setValueThree(true);
    }
    // check if every switch turns on it will turn on the all switch
    if (valueThree == true && valueTwo == true && status == "ON") {
      switchToggleAll();
    }

    try {
      await axios.post("/api/routes/manageLed", {
        userId: user._id,
        name: nameOne,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const switchToggleTwo = async () => {
    setValueTwo(!valueTwo);
    const status = valueTwo ? "OFF" : "ON";

    console.log("Button clicked", status, "two");
    // check if any switch off call switchtoggleall
    // check if any switch off call switchtoggleall
    if (status == "OFF" && valueAll == true) {
      switchToggleAll();
      setValueOne(true);
      setValueThree(true);
    }
    // check if every switch turns on it will turn on the all switch
    if (valueOne == true && valueThree == true && status == "ON") {
      switchToggleAll();
    }
    try {
      await axios.post("/api/routes/manageLed", {
        userId: user._id,
        name: nameTwo,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const switchToggleThree = async () => {
    setValueThree(!valueThree);
    const status = valueThree ? "OFF" : "ON";

    console.log("Button clicked", status, "three");
    // check if any switch off call switchtoggleall
    // check if any switch off call switchtoggleall
    if (status == "OFF" && valueAll == true) {
      switchToggleAll();
      setValueOne(true);
      setValueTwo(true);
    }
    // check if every switch turns on it will turn on the all switch
    if (valueOne == true && valueTwo == true && status == "ON") {
      switchToggleAll();
    }
    try {
      await axios.post("/api/routes/manageLed", {
        userId: user._id,
        name: nameThree,
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const switchToggleAll = async () => {
    setValueThree(!valueAll);
    setValueTwo(!valueAll);
    setValueOne(!valueAll);
    setValueAll(!valueAll);

    const status = valueAll ? "OFF" : "ON";

    console.log("Button clicked", status, "All");

    try {
      await axios.post("/api/routes/manageLed", {
        userId: user._id,
        name: "all",
        mode: mode,
        status: status,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const switches = [
    {
      state: valueOne,
      name: nameOne,
      checked: valueOne,
      icon: <LightIcon />,
      color: nameOne,
      handleChange: switchToggleOne,
    },
    {
      state: valueTwo,
      name: nameTwo,
      checked: valueTwo,
      icon: <LightIcon />,
      color: nameTwo,
      handleChange: switchToggleTwo,
    },
    {
      state: valueThree,
      name: nameThree,
      checked: valueThree,
      color: nameThree,
      icon: <LightIcon />,
      handleChange: switchToggleThree,
    },
    {
      state: valueAll,
      name: "All",
      checked: valueOne,
      icon: <LightIcon />,
      color: "#7a40f2",
      handleChange: switchToggleAll,
    },
  ];
  return (
    <ContainerGrid container spacing={2} justifyContent="flex-start">
      <SidebarGrid item xs={1}>
        <Sidebar />
      </SidebarGrid>

      {/* ---------------------------------------------------------- */}
      <MainGrid item className="led__herosection" xs={8}>
        <div className="led__wrapper">
          <div className="led__switches">
            <FourColumnDiv switches={switches}></FourColumnDiv>
          </div>
          <FormControl fullWidth sx={{ marginTop: "4em" }}>
            <InputLabel sx={{ color: "#fb641b" }} id="">
              Mode
            </InputLabel>
            <Select
              labelId=""
              id=""
              value={mode}
              label="mode"
              onChange={handleSelectChange}
            >
              <MenuItem value={"NORMAL"}>NORMAL</MenuItem>
              <MenuItem value={"BLINK"}>BLINK</MenuItem>
            </Select>
          </FormControl>
        </div>
      </MainGrid>
      {/* ----------------------------------------------- */}

      <TopbarGrid className="rightColumn" item xs={2}>
        <Topbar />
      </TopbarGrid>
    </ContainerGrid>
  );
};

export default LedControl;
