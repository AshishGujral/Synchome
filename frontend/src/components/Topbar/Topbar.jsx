import SettingsIcon from '@mui/icons-material/Settings';
import React, { Component } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import "./topbar.css";
export class Topbar extends Component {
  static propTypes = {}

  render() {
    return (
        <div className='topbar'>
          <div className='topButtons'>
          <IconButton aria-label="delete"> <SettingsIcon/></IconButton>
        <IconButton aria-label="delete"> <PersonIcon/></IconButton>
          </div>
      
        
      </div>
    )
  }
}

export default Topbar;



