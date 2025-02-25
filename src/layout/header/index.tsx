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
        <Button sx={{ color: "white" }} onClick={() => router.push("/auth/login/LoginPage")}>
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
