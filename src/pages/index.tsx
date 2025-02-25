import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";

const HeroSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
  background: "linear-gradient(to right, #0f0f0f, #1c1c1c)",
  color: "#fff",
  padding: "2rem",
});

const StyledButton = styled(Button)({
  backgroundColor: "#ff4757",
  color: "#fff",
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "8px",
  marginTop: "16px",
  transition: "0.3s",
  '&:hover': {
    backgroundColor: "#e84118",
  },
});

const Home = () => {
  const router = useRouter();
  return (
    <HeroSection>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
       Todo list is going on the way to do
      </Typography>
      <StyledButton onClick={() => router.push('/auth/login/LoginPage')}>
        Do it
      </StyledButton>
    </HeroSection>
  );
};

export default Home;
