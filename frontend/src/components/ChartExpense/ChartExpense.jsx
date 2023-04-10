import "./ChartExpense.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, styled } from "@mui/material";
import Select from "@mui/material/Select";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { subDays } from 'date-fns';

import { useState ,useEffect} from "react";

const ChartExpense = (tempData) => {
  const [period, setPeriod] = useState("month");
 // const [chartData] = tempData;
  const [labels, setLabels] = useState([]);
  const [datasets,setDatasets]= useState([]);
  const Box = styled("div")({
    border: "2px solid red",
    borderRadius: "5%",
    backgroundColor: "#f3e5f53e",
    height: "300px",
  });
  const StyledSelect = styled(Select)`
    background-color: whitesmoke;
  `;



  //   chart js ------------------------------------------
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,

        },
      },
    },
  };
  // fetching data from database

  useEffect(() => {
    if (tempData.tempData.length > 0) {
      // use type of to check we have seconds or date
      if(tempData.tempData.some(item => typeof item.seconds != "undefined")){
        setLabels(tempData.tempData.map(item => item.date));
        setDatasets([
        {
          label:"Seconds",
          data: tempData.tempData.map(item => item.seconds),
          borderColor: "#FF9060",
          backgroundColor: "#f3e5f573",
        },
        ]);
      }
      if(tempData.tempData.some(item => typeof item.temp != "undefined")){
        setLabels(tempData.tempData.map(item => item.date));
        setDatasets([
          {
            label: "Temperature",
            data: tempData.tempData.map(item => item.temp),
            borderColor: "#FF9060",
            backgroundColor: "#f3e5f573",
          },
          {
            label: "Humidity",
            data: tempData.tempData.map(item => item.humi),
            borderColor: "#FF9060",
            backgroundColor: "#f3e5f573",
          },
        ]);
      }
    }
  }, [tempData]);
  const data = {

    labels: labels, // use the date as the label
    datasets:datasets,
  };


  return (
    
    <Box className="Chart__Container">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel sx={{color:"#fb641b"}} id="demo-select-small">Time Period</InputLabel>
        <StyledSelect
          labelId="demo-select-small"
          id="demo-select-small"
          value={period}
          label="Time Period"
        >
          <MenuItem value={"month"}>Week</MenuItem>
        </StyledSelect>
      </FormControl>

      <Line options={options} data={data} />
    </Box>
  );
};

export default ChartExpense;
