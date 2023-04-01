import React from "react";
import { Box, Paper, Typography, Stack, Switch, styled } from "@mui/material";

const StyledPaper = styled(Paper)`

  &:hover {
    box-shadow: rgba(145, 15, 238, 0.667) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  }

`

const SwitchContainer = ({ checked, color, handleChange, name, icon }) => {

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 188,
          height: 128,
        },
      }}
    >
      <StyledPaper sx={{borderRadius:"8%",}} elevation={0}>
        <Stack>
          <Stack direction="column" spacing={4}>
          <Typography variant="h6">{name}</Typography>
        <i style={{fontSize:"26px", color:"#7A40F2"}} className={icon}></i>
          </Stack>
     
          <Switch sx={{marginRight:"10px", marginTop:0}} color={color} checked={checked} onChange={handleChange} />
        </Stack>
      </StyledPaper>
    </Box>
  );
};

export default SwitchContainer;
