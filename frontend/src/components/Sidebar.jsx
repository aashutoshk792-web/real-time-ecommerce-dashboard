import { Box, List, ListItem, ListItemText } from "@mui/material";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: 2,
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Products" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Customers" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;