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
  const [labels, setLabels] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const handleChange = (event) => {
    setPeriod(event.target.value);
    if (period === "week") {
      setLabels([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
    } else
      setLabels([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ]);
  };

  // fetching data from database
  const getData = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get('http://localhost:3000/backend/routes/dht',{ headers });
      const data = response.data;
      console.log("data",data[0].temperature);
      const sevenDaysAgo = subDays(new Date(), 7); // Calculate the date 7 days ago
      const filteredData = data.filter((d) => new Date(d.timestamp) > sevenDaysAgo); // Filter the data array
      const temperatures = filteredData.map((d) => d.temperature); // Map the filtered data to an array of temperatures
      setExpenseData(temperatures);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();

  }, []);
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
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "$ Dollars",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Electricity Expense",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: expenseData,
        borderColor: "#FF9060",
        backgroundColor: "#f3e5f573",
      },
    ],
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
          onChange={handleChange}
        >
          <MenuItem value={"month"}>Week</MenuItem>
          <MenuItem value={"week"}>Month</MenuItem>
        </StyledSelect>
      </FormControl>

      <Line options={options} data={data} />
    </Box>
  );
};

export default ChartExpense;
