import { Stack, styled, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import React from "react";

// styled components-----------------------------
const StyledStack = styled(Stack)`
  display: flex;
  margin-left: 20px;
  border: "2px solid #0000003d";
  border-radius: 5%;
  padding: 10px;
  max-height: 20%;
`;

const StyledList = styled(List)`
  flex-wrap: wrap;
  display: flex;
  border-radius: 10px;
`;
const StyledListItem = styled(ListItem)`
  width: 50%;
`;
const Title = styled(Typography)`
  font-weight: 600;
`;

// fake data: replace this with userinfo from backend--------------------------------
const endIndex = 4; // only rendering first 4 users on home screen

export default function Userlist() {
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/users/");
      setUserData(response.data);
    }
    fetchData();
  }, []);

  const PF = "http://localhost:3000/images/";

  return (
    <StyledStack direction="column" spacing={2}>
      <Title>Members (top 4)</Title>
      <StyledList
        className="box"
        sx={{ width: "100%", maxWidth: 360, bgcolor: "#c6aaff21" }}
      >
        {userData
          .slice(0, endIndex)
          .map(({ _id, username, email, profilePic }) => {
            return (
              <StyledListItem key={_id} className={_id}>
                <ListItemAvatar>
                  <Avatar
                    alt={username}
                    src={profilePic ? PF + profilePic : PF + "default-img.jpeg"}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>

                <ListItemText primary={username} />
              </StyledListItem>
            );
          })}
      </StyledList>
    </StyledStack>
  );
}
