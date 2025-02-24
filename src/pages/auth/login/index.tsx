import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import toast from "react-hot-toast";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const logInMutation = trpc.auth.login.useMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await logInMutation.mutateAsync(data);
      if (response?.token) {
        localStorage.setItem("auth_user", JSON.stringify(response));
        toast.success("🎉 Login successful!", {
          position: "top-center", // Centered on the page
          duration: 5000, // Show for 5 seconds
          icon: "🚀",
          style: {
            border: "2px solid #2196F3", // Blue border
            padding: "12px",
            color: "white",
            background: "linear-gradient(to right, #2196F3,rgb(3, 15, 27))", 
            fontSize: "10px",
            fontWeight: "300",
            boxShadow: "0px 0px 25px rgba(5, 58, 103, 0.8)",
            textAlign: "center",
            borderRadius: "12px",
            width: "300px", 
            letterSpacing: "1px",
            textTransform: "uppercase",
          },
        });
        
        if (response?.role === "ADMIN") 
        {
          router.push("/admin/dashboard");
        } 
        else if (response?.role === "SUBADMIN") 
        {
          router.push("/subadmin/dashboard");
        } 
        else 
        {
          router.push("/user/dashboard");
        }
      }
    } catch (error: any) {
          
      toast.error("Login failed", {
        position: "top-center", 
        duration: 5000,
    style: {border: "2px solid #2196F3", padding: "12px",color: "white",background: "linear-gradient(to right, #2196F3,rgb(3, 15, 27))", 
    fontSize: "10px",fontWeight: "300",boxShadow: "0px 0px 25px rgba(5, 58, 103, 0.8)",textAlign: "center",
    borderRadius: "12px",width: "300px", letterSpacing: "1px",textTransform: "uppercase",
        },
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#121212"
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "400px",
          bgcolor: "#1E1E1E",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="white">
          Log In
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ input: { color: "white" }, label: { color: "#bbb" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } } }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ input: { color: "white" }, label: { color: "#bbb" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } } }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: "bold",
                bgcolor: "#E50914",
                "&:hover": { bgcolor: "#B20710" },
              }}
            >
              Log In
            </Button>
          </Box>
        </form>

        <Typography variant="body2" textAlign="center" mt={2}>
          New Here? {" "}
          <Link href="/auth/register" style={{ color: "#bbb", textDecoration: "none", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
