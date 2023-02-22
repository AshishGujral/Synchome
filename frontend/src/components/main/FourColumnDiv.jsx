import React, { useState } from 'react';
import './FourColumnDiv.css';
import Switch from '@mui/material/Switch';

const FourColumnDiv = ({ switches }) => {
  const [state, setState] = useState(switches);

  const getContainerStyles = (isOn) => ({
    backgroundColor: isOn ? '#7a40f2' : '#fff',
    color: isOn ? '#fff' : '#7a40f2',
  });

  const handleSwitchChange = (index) => {
    const newSwitches = [...state];
    newSwitches[index].state = !newSwitches[index].state;
    setState(newSwitches);
  };

  return (
    <div className="group-42">
      {state.map((switchItem, index) => (
        <div
          key={index}
          className="container__switch"
          style={getContainerStyles(switchItem.state)}
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
