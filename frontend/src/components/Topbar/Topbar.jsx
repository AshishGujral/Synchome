import SettingsIcon from '@mui/icons-material/Settings';
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import "./topbar.css";
export class Topbar extends Component {
  static propTypes = {}

  render() {
    return (
        <div className='topbar'>
          <div className='topButtons'>
          <Link to="/UserHome">
          <IconButton aria-label="delete"> <SettingsIcon/></IconButton>
          </Link>
        <IconButton aria-label="delete"> <PersonIcon/></IconButton>
          </div>
      
        
      </div>
    )
  }
}

export default Topbar;



