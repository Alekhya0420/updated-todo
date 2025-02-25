// import React from "react";
// import { TextField, Button, Box, Typography, Paper } from "@mui/material";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { trpc } from "@/utils/trpc";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { useRouter } from "next/router";


// interface RegisterFormInputs {
//   name: string;
//   email: string;
//   password: string;
// }

// const RegisterPage: React.FC = () => {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
//   const registerMutation = trpc.auth.register.useMutation();

//   const onSubmit: SubmitHandler<RegisterFormInputs> = (data: { name: string; email: string; password: string }) => {
//     registerMutation.mutate(data, {
//       onSuccess: () => {
//         toast.success("Registration successful!");
//         router.push("/auth/login");
//       },
//       onError: (error) => {
//         console.error("Registration failed:", error);
//         toast.error("Registration failed: " + error.message);
//       },
//     });
//     console.log(data);
//   };
//   return (
    
//     <Box 
//       display="flex" 
//       justifyContent="center" 
//       alignItems="center" 
//       minHeight="100vh" 
//       bgcolor="#f3f4f6"
//     >
//       <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: "400px" }}>
//         <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
//           Register
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box display="flex" flexDirection="column" gap={2}>
            
//             {/* Name Input */}
//             <TextField
//               label="Name"
//               variant="outlined"
//               fullWidth
//               {...register("name", { required: "Name is required" })}
//               error={!!errors.name}
//               helperText={typeof errors.name?.message === 'string' ? errors.name.message : undefined}
//             />

//             {/* Email Input */}
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               error={!!errors.email}
//               helperText={typeof errors.email?.message === 'string' ? errors.email.message : undefined}
//               />

//             {/* Password Input */}
//             <TextField
//               label="Password"
//               variant="outlined"
//               fullWidth
//               type="password"
//               {...register("password", { 
//                 required: "Password is required", 
//                 minLength: { value: 6, message: "Password must be at least 6 characters" }
//               })}
//               error={!!errors.password}
//               helperText={typeof errors.password?.message === 'string' ? errors.password.message : undefined}
//               />

//             {/* Submit Button */}
//             <Button 
//               type="submit" 
//               variant="contained" 
//               color="primary" 
//               sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
//             >
//               Register
//             </Button>

//           </Box>
//         </form>
//         <Typography variant="body2" textAlign="center" mt={2}>Already Have an Account? <Link href={'/auth/login'}>LogIN</Link></Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default RegisterPage;


import React from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const registerMutation = trpc.auth.register.useMutation();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        //toast.success("Registration successful!");
        toast.success("🎉 Registration successful!", {
          position: "top-center", 
          duration: 5000, 
          icon: "🚀",
          style: {border: "2px solid #2196F3", padding: "12px",color: "white",background: "linear-gradient(to right, #2196F3,rgb(3, 15, 27))", 
          fontSize: "10px",fontWeight: "300",boxShadow: "0px 0px 25px rgba(5, 58, 103, 0.8)",
          textAlign: "center",borderRadius: "12px",width: "300px", 
          letterSpacing: "1px",textTransform: "uppercase",
          },
        });
        router.push("/auth/login");
      },
      onError: (error) => {
        console.error("Registration failed:", error);
        
        toast.success("🎉Registration failed", {
          position: "top-center", 
          duration: 5000,
          icon: "🚀",
      style: {border: "2px solid #2196F3", padding: "12px",color: "white",background: "linear-gradient(to right, #2196F3,rgb(3, 15, 27))", 
      fontSize: "10px",fontWeight: "300",boxShadow: "0px 0px 25px rgba(5, 58, 103, 0.8)",textAlign: "center",
      borderRadius: "12px",width: "300px", letterSpacing: "1px",textTransform: "uppercase",
          },
        });
      },
    });
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#121212" // Dark Background
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          borderRadius: 3, 
          width: "400px", 
          bgcolor: "#1E1E1E", // Dark Gray Box
          color: "white" 
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="white">
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>

            {/* Name Input */}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ input: { color: "white" }, label: { color: "#bbb" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } } }}
            />

            {/* Email Input */}
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

            {/* Password Input */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ input: { color: "white" }, label: { color: "#bbb" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#555" } } }}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                mt: 2, 
                py: 1.2, 
                fontWeight: "bold", 
                bgcolor: "#E50914", // Red Theme
                "&:hover": { bgcolor: "#B20710" } 
              }}
            >
              Register
            </Button>

          </Box>
        </form>

        {/* Login Link */}
        <Typography variant="body2" textAlign="center" mt={2}>
          Already Have an Account? 
          <Link href={'/auth/login/LoginPage'} style={{ color: "#bbb", textDecoration: "none", fontWeight: "bold" }}>
            {" "}Log In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
