import React from "react";
import { Box, Paper, Typography, Stack, Switch, styled } from "@mui/material";

const StyledPaper = styled(Paper)`
  &:hover {
    box-shadow: rgba(145, 15, 238, 0.667) 0px 5px 15px;
  }

  border-radius: 8%;
`;

const getContainerStyles = (isOn) => ({
  backgroundColor: isOn ? "#7a40f2" : "#fff",
  color: isOn ? "#fff" : "#7a40f2",
});

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
      <StyledPaper sx={getContainerStyles(checked)} elevation={0}>
        <Stack>
          <Stack direction="column" spacing={4}>
            <Typography variant="h6">{name}</Typography>
            <i style={{ fontSize: "26px" }} className={icon}></i>
          </Stack>

          <Switch
            sx={{ marginRight: "10px", marginTop: 0 }}
            color={color}
            checked={checked}
            onChange={handleChange}
          />
        </Stack>
      </StyledPaper>
    </Box>
  );
};

export default SwitchContainer;
