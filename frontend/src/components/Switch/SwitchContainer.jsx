import React from "react";
import { Box, Paper, Typography, Stack, Switch } from "@mui/material";


const SwitchContainer = ({ checked, color, handleChange, name, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3}>
        <Typography variant="h6">{name}</Typography>
        <i className={icon}></i>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Off</Typography>
          <Switch color={color} checked={checked} onChange={handleChange} />

          <Typography>On</Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SwitchContainer;
