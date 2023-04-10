import SettingsIcon from '@mui/icons-material/Settings';
import React, { Component } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import "./footer.css";
export class Footer extends Component {
  static propTypes = {}

  render() {
    return (
        <div className='footer'>
        <IconButton aria-label="delete"> <SettingsIcon/></IconButton>
        <IconButton aria-label="delete"> <PersonIcon/></IconButton>
        
      </div>
    )
  }
}

export default Footer;



