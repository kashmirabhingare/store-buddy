import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate("/inventory")}>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button onClick={() => navigate("/payments")}>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button onClick={() => navigate("/alerts")}>
          <ListItemText primary="Alerts" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
