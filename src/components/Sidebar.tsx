import React from "react";
import {Drawer,List,ListItem,ListItemIcon,ListItemText,Toolbar,Divider} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    {text:"Admindashboard",path:"/admin"},
    {text:"Users",path:"/admin/dashboard"},
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#121216", 
          color: "#fff", 
        },
      }}
    >
      <Toolbar />
      <Divider sx={{ backgroundColor: "#333" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => router.push(item.path)}
            sx={{
              "&:hover": {
                backgroundColor: "#333", // Slightly lighter black for hover effect
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: "#fff" }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
