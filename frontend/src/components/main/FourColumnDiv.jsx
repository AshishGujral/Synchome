import React, { useState } from 'react';
import './FourColumnDiv.css';
import Switch from '@mui/material/Switch';

const FourColumnDiv = ({ switches }) => {
  const handleSwitchChange= (index) => {
    switches[index].state = !switches[index].state;
    switches[index].handleChange();
   
  };

  const getContainerStyles = (isOn,color) => ({
    backgroundColor: isOn ? color : '#fff',
    color: isOn ? 'white' : color,
  });

  return (
    <div className="group-42">
      {switches.map((switchItem, index) => (
        <div
          key={index}
          className="container__switch"
          style={getContainerStyles(switchItem.state,switchItem.color)}
        >
          <div className="switch-on">{switchItem.state ? 'On' : 'Off'}</div>
      
          <div className="Switch">
            <Switch
              color="warning"
              checked={switchItem.state}
              onChange={() => handleSwitchChange(index)}
            />
          </div>
          <div className='FourcolumnIcon'>{switchItem.icon}</div>
          <span className="switch-content">{switchItem.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FourColumnDiv;
