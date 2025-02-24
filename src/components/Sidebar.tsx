// import React from "react";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { useRouter } from "next/router";

// const Sidebar = () => {
//   const router = useRouter();

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
//     { text: "Users", icon: <PeopleIcon />, path: "/admin/dashboard" },
//     { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
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

// export default Sidebar;






import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    {text:"Dashboard",icon:<DashboardIcon/>,path:"/admin"},
    {text:"Users",icon:<PeopleIcon/>,path:"/admin/dashboard"},
    // {text:"Settings",icon:<SettingsIcon/>,path:"/admin/settings"},
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
