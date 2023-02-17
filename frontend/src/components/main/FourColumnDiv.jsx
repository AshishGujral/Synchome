import * as React from "react";
import "./FourColumnDiv.css";
import Switch from "@mui/material/Switch";
const FourColumnDiv = () => {
  const [waterPump, setWaterPump] = React.useState(false);
  const [temperature, setTemperature] = React.useState(false);
  const [motionSensor, setMotionSensor] = React.useState(false);
  const [lights, setLights] = React.useState(false);

  const getContainerStyles = (isOn) => ({
    backgroundColor: isOn ? "#7a40f2" : "#fff",
    color: isOn ? "#fff" : "#7a40f2",
  });

  return (
    <div className="group-42">
      <div className="container" style={getContainerStyles(waterPump)}>
        {waterPump ? (
          <div className="switch-on">On</div>
        ) : (
          <div className="switch-on">Off</div>
        )}
        <div className="Switch">
          <Switch
            color="warning"
            checked={waterPump}
            onChange={() => setWaterPump(!waterPump)}
          />
        </div>
        <span className="switch-content">Water Pump</span>
      </div>
      <div className="container" style={getContainerStyles(temperature)}>
        {temperature ? (
          <div className="switch-on">On</div>
        ) : (
          <div className="switch-on">Off</div>
        )}
        <div className="Switch">
         
          <Switch
            color="warning"
            checked={temperature}
            onChange={() => setTemperature(!temperature)}
          />
        </div>
        <span className="switch-content">Temperature</span>
      </div>
      <div className="container" style={getContainerStyles(motionSensor)}>
        {motionSensor ? (
          <div className="switch-on">On</div>
        ) : (
          <div className="switch-on">Off</div>
        )}
        <div className="Switch">
          <Switch
            color="warning"
            checked={motionSensor}
            onChange={() => setMotionSensor(!motionSensor)}
          />
        </div>
        <span className="switch-content">Motion Sensor</span>
      </div>
      <div className="container" style={getContainerStyles(lights)}>
        {lights ? (
          <div className="switch-on">On</div>
        ) : (
          <div className="switch-on">Off</div>
        )}
        <div className="Switch">
       
          <Switch
            color="warning"
            checked={lights}
            onChange={() => setLights(!lights)}
          />
        </div>
        <span className="switch-content">Lights</span>
      </div>
    </div>
  );
};

export default FourColumnDiv;
