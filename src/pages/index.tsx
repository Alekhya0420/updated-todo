// import React from "react";
// import { Container, Box, Typography, Button, Grid, Paper } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { styled } from "@mui/system";
// import { useRouter } from "next/router";

// const HeroSection = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "80vh",
//   textAlign: "center",
//   background: "linear-gradient(to right, #6a11cb, #2575fc)",
//   color: "#fff",
//   padding: "2rem",
// });

// const FeatureCard = styled(Paper)({
//   padding: "2rem",
//   textAlign: "center",
//   borderRadius: "10px",
//   transition: "0.3s",
//   '&:hover': {
//     transform: "scale(1.05)",
//   },
// });

// const Home = () => {
//   const router = useRouter();
//   return (
//     <>
//       <HeroSection>
//         <Typography variant="h2" fontWeight="bold" gutterBottom>
//           Manage Your Tasks Efficiently
//         </Typography>
//         <Typography variant="h6" gutterBottom>
//           Stay organized, stay productive with our task management app.
//         </Typography>
//         <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }} onClick={()=>router.push('/auth/login')}>
//           Get Started
//         </Button>
//       </HeroSection>

//       <Container sx={{ my: 5 }}>
//         <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
//           Why Choose Us?
//         </Typography>
//         <Grid container spacing={4} sx={{ mt: 2 }}>
//           {["Task Organization", "Deadline Reminders", "Collaboration Features"].map((feature, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <FeatureCard elevation={4}>
//                 <CheckCircleIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
//                 <Typography variant="h6" fontWeight="bold">
//                   {feature}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </Typography>
//               </FeatureCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Home;


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
      <StyledButton onClick={() => router.push('/auth/login')}>
        Do it
      </StyledButton>
    </HeroSection>
  );
};

export default Home;
