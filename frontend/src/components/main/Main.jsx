import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import "./Main.css";
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(Context);
  // getting weather data using api
  const [weather, setWeather] = useState(null);
  const [weatherId,setweatherId] = useState();
  var weatherCond;
  var weatherIcon;
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=49.25&lon=-123.13&appid=a0b285919705592193ac7e7334b9dbf6"
        );
        const data = await response.json();
        setWeather(data);
        setweatherId(data.weather[0].id);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeather();
  }, []);
  if (weatherId >= 200 && weatherId <= 232) {
    weatherIcon ="bi bi-cloud-lightning-rain";
      weatherCond = "Thunderstorm";
  } 
  else if (weatherId >= 300 && weatherId <= 321) {
    weatherIcon ="bi bi-cloud-drizzle";
    weatherCond = "Drizzle";
  } else if (weatherId >= 500 && weatherId <= 531) {
    weatherIcon ="bi bi-cloud-rain";
    weatherCond = "Rain";
  } else if (weatherId >= 600 && weatherId <= 622) {
    weatherIcon ="bi bi-cloud-snow";
    weatherCond = "Snow";
  } else if (weatherId >= 701 && weatherId <= 781) {
    weatherIcon ="bi bi-cloud-haze";
    weatherCond = "Mist";
  } else if (weatherId === 800) {
    weatherIcon ="bi bi-sun";
    weatherCond = "Clear";
  } else if (weatherId >= 801 && weatherId <= 804) {
    weatherIcon ="bi bi-cloud";
    weatherCond = "Clouds";
  } else {
    weatherCond = "Unknown";

  }
  
  //Math.round(Weather.main.temp - 273.15)
  //Weather.main.humidity

  let CurrentTemp, humi;

  if (weather !== null && weather !== undefined) {
    CurrentTemp = Math.round(weather.main.temp - 273.15);
    humi = weather.main.humidity;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="Main">
      <div className="groupWrapper6">
        <div className="groupWrapper7">
          <div className="groupWrapper7">
            <img className="groupWrapper7" alt="" src="../../path1.svg" />
            <div className="text">
              <div className="welcomeHomeThe">{`Welcome Home! The air quality is good & fresh you can go out today.`}</div>
              <b className="helloScarlett">Hello, {user.username}</b>
              <div className="outdoorTemperatureParent">
                <div className="outdoorTemperature">Outdoor temperature</div>
                <i className="fa-solid fa-temperature-quarter pathIcon2"></i>
                <div className="parent1">
                  <div className="div6">{CurrentTemp}°C</div>
                </div>
              </div>
              <div className="fuzzyCloudyWeatherParent">
              <i className={weatherIcon}></i>  
                <div className="fuzzyCloudyWeather">{weatherCond}</div>
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
          <p className=""> indoor Temp ℃</p>
          <i className="fa-solid fa-droplet parent2Icon"> </i>
          <p className=""> Humidity {humi}%</p>
        </div>

  
      </div>
    </div>
  );
};

export default App;
