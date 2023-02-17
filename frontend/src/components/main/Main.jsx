import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import "./Main.css";

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Living Room");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) {
      setSelectedOption(option);
    }
  };

  return (
    <div className="Main">
      <div className="groupWrapper6">
        <div className="groupWrapper7">
          <div className="groupWrapper7">
            <img className="groupWrapper7" alt="" src="../../path1.svg" />
            <div className="text">
              <div className="welcomeHomeThe">{`Welcome Home! The air quality is good & fresh you can go out today.`}</div>
              <b className="helloScarlett">Hello, Scarlett!</b>
              <div className="outdoorTemperatureParent">
                <div className="outdoorTemperature">Outdoor temperature</div>
                <i className="fa-solid fa-temperature-quarter pathIcon2"></i>
                <div className="parent1">
                  <div className="div6">25</div>
                  <img className="ovalIcon5" alt="" src="../../oval5.svg" />
                  <div className="c5">C</div>
                </div>
              </div>
              <div className="fuzzyCloudyWeatherParent">
              <i class="fa-regular fa-cloud"></i>
                <div className="fuzzyCloudyWeather">Fuzzy cloudy weather</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-Content">
        <div className="home-text">
          <b>Sync Home</b>
        </div>

        <div className="parent2">
      
        <i className="fa-solid fa-temperature-quarter parent2Icon"></i>
        <p className=""> indoor Temp ℃
          </p>
          <i className="fa-solid fa-droplet parent2Icon"> </i>
          <p className=""> Humidity %
          </p>
         
        </div>

        <div className="dropdown-container">
          <Button
            variant="outlined"
            onClick={handleClick}
            endIcon={<ArrowDropDown />}
          >
            {selectedOption}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            <MenuItem onClick={() => handleClose("Living Room")}>
              Living Room
            </MenuItem>
            <MenuItem onClick={() => handleClose("Kitchen")}>Kitchen</MenuItem>
            <MenuItem onClick={() => handleClose("Tokyo")}>Tokyo</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default App;
