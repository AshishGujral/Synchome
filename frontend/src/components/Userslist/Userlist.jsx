import { Stack, styled, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

// styled components-----------------------------
const StyledStack = styled(Stack)`
  display: flex;
  border: 2px solid red;
  border-radius: 5%;
  left: 5%;
  padding-left: 10px;
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
const userData = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    name: "Amy",
    accessLevel: "Admin",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/716658/pexels-photo-716658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Santa",
    accessLevel: "Full access",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3793230/pexels-photo-3793230.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Martha",
    accessLevel: "Limited access",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/7266002/pexels-photo-7266002.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Don",
    accessLevel: "No access",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/7266002/pexels-photo-7266002.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Don",
    accessLevel: "No access",
  },
];

export default function Userlist() {
  return (
    <StyledStack direction="column" spacing={2}>
      <Title>Members (top 4)</Title>
      <StyledList
        className="box"
        sx={{ width: "100%", maxWidth: 360, bgcolor: "#f3e5f573" }}
      >
        {userData.slice([0], [endIndex]).map(({ id, image, name, accessLevel }) => {
          return (
            <StyledListItem className={id}>
              <ListItemAvatar>
                <Avatar alt={name} src={image} sx={{ width: 50, height: 50 }} />
              </ListItemAvatar>
              <ListItemText primary={name} secondary={accessLevel} />
            </StyledListItem>
          );
        })}

      </StyledList>
    </StyledStack>
  );
}
