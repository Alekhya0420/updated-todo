// import React from "react";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { useRouter } from "next/router";

// const UserSidebar = () => {
//   const router = useRouter();

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/user/dashboard" },
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         backgroundColor:"black",
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

// export default UserSidebar;


import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from "@mui/material";
import { useRouter } from "next/router";

const UserSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { text: "Mydashboard", path: "/user/dashboard" },
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
          bgcolor: "#121219", // Blackish background
          color: "white", 
        },
      }}
    >
      <Toolbar />
      <Divider sx={{ bgcolor: "gray" }} /> 
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            onClick={() => router.push(item.path)} 
            sx={{
              "&:hover": { bgcolor: "#333" }, // Slight hover effect
              color: "white",
            }}
          >
            <ListItemText primary={item.text} sx={{ color: "white" }} /> {/* White text */}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default UserSidebar;
