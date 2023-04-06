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

const ChartExpense = () => {
  const [period, setPeriod] = useState("month");
  const [expenseData, setExpenseData] = useState([]);
  const [labels, setLabels] = useState([]);
  
  
  // fetching data from database
    useEffect(() => {
      const fetchData = async () => {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get('http://localhost:3000/backend/routes/dht', { headers });
        const data = response.data;
        
        
        /*const currentDate = new Date();
        const before = new Date();
        before.setDate(currentDate.getDate() - 5);*/

        const filteredData = data.filter(item => {
          const itemDate = new Date(item.time.substr(0, 10)); // extract date portion
          return itemDate.toISOString().substr(0,10); //>= before.toISOString().substr(0,10) && itemDate.toISOString().substr(0,10) <= currentDate.toISOString().substr(0,10);
        });
  
        const groupedData = {};
  
        filteredData.forEach(item => {
          const date = item.time.substr(0, 10);
          if (!groupedData[date]) {
            groupedData[date] = {
              date: date,
              temp: item.temperature,
              humi: item.humidity
            };
          } else {
            groupedData[date].temp =item.temperature;
            groupedData[date].humi = item.humidity;
          }
        });
        // use object.value to return an array of grouped data
        const aggregatedData = Object.values(groupedData);
        setExpenseData(aggregatedData);
        console.log("aggregate",aggregatedData);
        console.log("ExpenseData",groupedData);
      };
  
      fetchData();
    }, []);
    
  const Box = styled("div")({
    border: "2px solid #0000003d",
    borderRadius: "5%",
    // backgroundColor: "#f3e5f53e",
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
          text: "$ Dollars",
        },
      },
    },
  };

  const data = {

    labels: expenseData.map(item => item.date), // use the date as the label
    temp:expenseData.map(item => item.temp),

    datasets: [
      {
        label: "Temperature",
        data:expenseData.map(item => item.temp), // use expenseData and map to the temp value
        borderColor: "#FF9060",
        backgroundColor: "#f3e5f573",
      },
      {
        label: "Humidity",
        data:expenseData.map(item => item.humi), // use expenseData and map to the temp value
        borderColor: "#FF9060",
        backgroundColor: "#f3e5f573",
      },
    ],
  
  };

  console.log(data);

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
          <MenuItem value={"week"}>Month</MenuItem>
        </StyledSelect>
      </FormControl>

      <Line options={options} data={data} />
    {  console.log("Hello",data)}
    </Box>
  );
};

export default ChartExpense;
