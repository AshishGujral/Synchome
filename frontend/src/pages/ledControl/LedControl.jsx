import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import SwitchContainer from "../../components/Switch/SwitchContainer";

import "./ledcontrol.css";

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
  const {user} = useContext(Context);
  
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

  const switchToggleOne = async () => {
    setValueOne(!valueOne);

    const status = valueOne ? "OFF" : "ON";

    // try {
    //   await axios.post("/api/routes/manageLed", {
    //     userId: user._id,
    //     name: nameOne,
    //     mode: mode,
    //     status: status,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const switchToggleTwo = async () => {
    setValueTwo(!valueTwo);
    const status = valueTwo ? "OFF" : "ON";

    console.log("Button clicked", status, "two");

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
        name: "All",
        mode: mode,
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
      <MainGrid item className="led__herosection" xs={8}>
        <div className="led__wrapper">
          <div className="led__switches">
            <div>
              <SwitchContainer
                checked={valueOne}
                key={1}
                icon={"fa-solid fa-1"}
                name={nameOne}
                color="secondary"
                handleChange={switchToggleOne}
              ></SwitchContainer>
            </div>
            <div>
              <SwitchContainer
                checked={valueTwo}
                key={2}
                icon={"fa-solid fa-2"}
                name={nameTwo}
                color="success"
                handleChange={switchToggleTwo}
              ></SwitchContainer>
            </div>{" "}
            <div>
              <SwitchContainer
                checked={valueThree}
                key={3}
                icon={"fa-solid fa-3"}
                name={nameThree}
                color="primary"
                handleChange={switchToggleThree}
              ></SwitchContainer>
            </div>
            <div>
              <SwitchContainer
                checked={valueAll}
                key={4}
                icon={"fa-solid fa-arrow-up-1-9"}
                name={"All"}
                color="default"
                handleChange={switchToggleAll}
              ></SwitchContainer>
            </div>
       
          </div>
          <FormControl fullWidth sx={{ marginTop: "4em" }}>
          <InputLabel sx={{color:"#fb641b"}} id="">Mode</InputLabel>
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
