import "./ChartExpense.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, styled } from "@mui/material";
import Select from "@mui/material/Select";

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

import { useState } from "react";

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

  const Box = styled("div")({
    border: "2px solid red",
    borderRadius: "5%",
    backgroundColor: "#f3e5f53e",
    marginTop: "10%",
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
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
