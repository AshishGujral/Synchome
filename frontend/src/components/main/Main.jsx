import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown } from '@mui/icons-material';
import './Main.css';

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Living Room');

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
                <img className="pathIcon2" alt="" src="../../path2.svg" />
                <div className="parent1">
                  <div className="div6">25</div>
                  <img className="ovalIcon5" alt="" src="../../oval5.svg" />
                  <div className="c5">C</div>
                </div>
              </div>
              <div className="fuzzyCloudyWeatherParent">
                <img className="pathIcon3" alt="" src="../../path3.svg" />
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
          <img className="pathIcon4" alt="" src="../../path2.svg" />
          <div className="div7">25</div>
          <img className="ovalIcon6" alt="" src="../../oval5.svg" />
          <div className="c6">C</div>
        </div>

        <div className="dropdown-container">
          <Button variant="outlined" onClick={handleClick} endIcon={<ArrowDropDown />}>
            {selectedOption}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            <MenuItem onClick={() => handleClose('Living Room')}>Living Room</MenuItem>
            <MenuItem onClick={() => handleClose('Kitchen')}>Kitchen</MenuItem>
            <MenuItem onClick={() => handleClose('Tokyo')}>Tokyo</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default App;
