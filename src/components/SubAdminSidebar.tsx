// import React from "react";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { useRouter } from "next/router";

// const SubAdminSidebar = () => {
//   const router = useRouter();

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/subadmin/dashboard" },
//     // { text: "Users", icon: <PeopleIcon />, path: "/admin/dashboard" },
//     // { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       <Toolbar />
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} onClick={() => router.push(item.path)}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default SubAdminSidebar;


import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/router";

const SubAdminSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/subadmin/dashboard" },
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
          backgroundColor: "#121216", // Dark background
          color: "#ffffff", // White text
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
                backgroundColor: "#1e1e1e", // Slightly lighter black
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SubAdminSidebar;
