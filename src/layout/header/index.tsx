// import React from "react";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { Box } from "@mui/system";
// import HomeIcon from "@mui/icons-material/Home";
// import { useRouter } from "next/router";

// const Header = () => {
//     const router = useRouter();
//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <Box display="flex" alignItems="center" flexGrow={1}>
//           <HomeIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" component="div">
//             MyBrand
//           </Typography>
//         </Box>
        
        
//         <Button color="inherit" onClick={() => router.push("/auth/login")}>
//           Sign In
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;


import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ bgcolor: "#121212" }}> {/* Blackish background */}
      <Toolbar>
        {/* Brand Name */}
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", flexGrow: 1 }}>
          MyBrand
        </Typography>

        {/* Sign In Button */}
        <Button sx={{ color: "white" }} onClick={() => router.push("/auth/login")}>
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
