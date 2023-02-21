import { Add, Bloodtype } from "@mui/icons-material";
import { fontSize, fontWeight } from "@mui/system";
import { Grid, styled } from "@mui/material";
import React, { Component } from "react";
import ChartExpense from "../ChartExpense/ChartExpense";
import FourColumnDiv from "../main/FourColumnDiv";
import Topbar from "../Topbar/Topbar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HallIcon from '@mui/icons-material/Weekend';
import BasementIcon from '@mui/icons-material/MeetingRoom';
import "./AcControlMain.css";
const ContainerGrid = styled(Grid)`
  justify-content: center;
  width: 100%;
`;

export default class AcControlMain extends Component {
  render() {
    return (
      <div>
        <div className="M">AC Control</div>
        <div>
          <FourColumnDiv
            switches={[
              { name: "Kitchen", state: false, icon:<KitchenIcon/> },
              { name: "Hall", state: false, icon:<HallIcon/> },
              { name: "Basement", state: false , icon:<BasementIcon/>},
            ]}
          />
        </div>
        <div className="Ac-Main">
          <div className="Power-Consumed">
            Power Consumed
            <div className="power-content">
              {" "}
              <ChartExpense />
            </div>
          </div>
          <div className="Controls">
            Controls
            <div className="controls-content">
              <IconButton size="large"  className="addIcon" >
                <AddIcon fontSize="large" />
              </IconButton>
                <div className="controls-content-content">38°C</div>
              <IconButton size="large" className="removeIcon">
                <RemoveIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
