import "./sidebar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { HomeOutlined, InboxOutlined } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import SpatialTrackingOutlinedIcon from "@mui/icons-material/SpatialTrackingOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    name: "Home",
    link: "/",
    icon: <HomeOutlined />,
  },
  { name: "Lights",link:"/ledcontrol", icon: <EmojiObjectsIcon /> },
  { name: "Plants", link: "/waterControl", icon: <YardOutlinedIcon /> },
  { name: "Proximity", link: "/motioncontrol", icon: <SpatialTrackingOutlinedIcon /> },
  {
    name: "Weather",
    link: "/accontrol",
    icon: <DeviceThermostatOutlinedIcon />,
  },
  { name: "Profile", icon: <PersonIcon />, link:"/UserHome" },
];

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const getList = () => (
    <div className="sidebar" onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <Link key={index}to={item.link}>
          <ListItem className="sidebar__item" button key={index}>
            <motion.i whileHover={{ scale: 1.3 }}>
              <ListItemIcon className="sidebar__icon">{item.icon}</ListItemIcon>
            </motion.i>
            <ListItemText className="sidebar__text" primary={item.name} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
  return (
    <div className="sidebar__container">
      <Drawer
        variant="permanent"
        open={open}
        anchor={"left"}
        onClose={() => setOpen(false)}
      >
        {getList()}
        <Divider />

        <Link to="/login">
          <ListItem
            onClick={handleLogout}
            className="sidebar__item sidebar__logout"
            button
            key={10}
          >
            <ListItemIcon className="sidebar__icon">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </Drawer>
    </div>
  );
}

export default Sidebar;
