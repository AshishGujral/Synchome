import { Stack, styled, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

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
`
const StyledListItem = styled(ListItem)`
    width: 50%;
`
const Title = styled(Typography)`
    font-weight: 600;
`

export default function Userlist() {
  return (
    
    <StyledStack direction="column" spacing={2}>
        <Title>Members</Title>
      <StyledList className="box" sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <StyledListItem className="firstItem">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              sx={{ width: 50, height: 50 }}
            />
          </ListItemAvatar>
          <ListItemText primary="Amy" secondary="Full Access" />
        </StyledListItem>

        <StyledListItem className="secondItem">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              sx={{ width: 50, height: 50 }}
            />
          </ListItemAvatar>
          <ListItemText primary="Amy" secondary="Full Access" />
        </StyledListItem>

        <StyledListItem className="thirdItem">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              sx={{ width: 50, height: 50 }}
            />
          </ListItemAvatar>
          <ListItemText primary="Amy" secondary="Full Access" />
        </StyledListItem>

        <StyledListItem className="fourthItem">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              sx={{ width: 50, height: 50 }}
            />
          </ListItemAvatar>
          <ListItemText primary="Amy" secondary="Full Access" />
        </StyledListItem>
      </StyledList>
    </StyledStack>
  );
}
