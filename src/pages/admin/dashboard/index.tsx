// import React, { useEffect, useState } from "react";
// import { trpc } from "@/utils/trpc";
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControlLabel,
//   Switch,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import Sidebar from "@/components/Sidebar";
// import toast from "react-hot-toast";


// interface AuthAdminUser {
//   userId: string;
//   name: string; // Add the name property
//   // Add other properties if needed
// }


// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string; // Add the role property
//   tasks: { id: string }[];
//   permissions?: {
//     viewAllTasks: boolean;
//     editAllTasks: boolean;
//     deleteAllTasks: boolean;
//   };
// }

// const AdminDashboard = () => {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [open, setOpen] = useState(false);
//   const [permissions, setPermissions] = useState({
//     viewAllTasks: false,
//     editAllTasks: false,
//     deleteAllTasks: false,
//   });

//   const { data: users, refetch: refetchUsers } = trpc.admin.getAllUsers.useQuery();
//   const updateUserRole = trpc.admin.updateUserRole.useMutation({
//     onSuccess: () => {
//       refetchUsers();
//       setOpen(false);
//       toast.success("User role updated successfully");
//     },
//   });

//   const handleEditClick = (user: User) => {
//     console.log("User before editing:", user); // Debugging log
//     setSelectedUser(user);
//     setPermissions(user.permissions || {
//       viewAllTasks: false,
//       editAllTasks: false,
//       deleteAllTasks: false,
//     });
//     setOpen(true);
//   };

//   const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPermissions({ ...permissions, [event.target.name]: event.target.checked });
//   };
  


//   const handleSave = async () => {
//     if (selectedUser) {
//       await updateUserRole.mutateAsync({ userId: selectedUser.id, permissions });
  
//       // Manually update the selected user and users state to reflect the new permissions
//       setSelectedUser((prevUser) =>
//         prevUser ? { ...prevUser, permissions } : prevUser
//       );
  
//       refetchUsers(); // Ensure the latest data is fetched from the backend
//       setOpen(false);
//     }
//   };

//   return (
//     <Box display="flex">
//       <Sidebar />
//       <Container maxWidth="lg">
//         <Typography variant="h4" gutterBottom>
//           Admin Dashboard
//         </Typography>
//         <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//           <Typography variant="h6">User Management</Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users?.map((user: User) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleEditClick(user)}>
//                         <EditIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>

//         <Dialog open={open} onClose={() => setOpen(false)}>
//           <DialogTitle>Edit User Permissions</DialogTitle>
//           <DialogContent>
//             <FormControlLabel
//               control={<Switch checked={permissions.viewAllTasks} onChange={handlePermissionChange} name="viewAllTasks" />}
//               label="View All Tasks"
//             />
//             <FormControlLabel
//               control={<Switch checked={permissions.editAllTasks} onChange={handlePermissionChange} name="editAllTasks" />}
//               label="Edit All Tasks"
//             />
//             <FormControlLabel
//               control={<Switch checked={permissions.deleteAllTasks} onChange={handlePermissionChange} name="deleteAllTasks" />}
//               label="Delete All Tasks"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSave}>
//               Save Changes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Container>
//     </Box>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "@/components/Sidebar";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState({
    viewAllTasks: false,
    editAllTasks: false,
    deleteAllTasks: false,
  });

  const { data: users, refetch: refetchUsers } = trpc.admin.getAllUsers.useQuery();
  const updateUserRole = trpc.admin.updateUserRole.useMutation({
    onSuccess: () => {
      refetchUsers();
      setOpen(false);
    },
  });

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setPermissions(user.permissions || {
      viewAllTasks: false,
      editAllTasks: false,
      deleteAllTasks: false,
    });
    setOpen(true);
  };

  const handlePermissionChange = (event) => {
    setPermissions({ ...permissions, [event.target.name]: event.target.checked });
  };

  const handleSave = async () => {
    if (selectedUser) {
      await updateUserRole.mutateAsync({ userId: selectedUser.id, permissions });
      setSelectedUser((prevUser) => (prevUser ? { ...prevUser, permissions } : prevUser));
      refetchUsers();
      setOpen(false);
    }
  };

  return (
    <Box display="flex" sx={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
      <Sidebar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: "#1e1e1e", color: "#fff" }}>
          <Typography variant="h6">User Management</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Role</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id} sx={{ backgroundColor: "#2a2a2a" }}>
                    <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{user.role}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(user)}>
                        <EditIcon sx={{ color: "#fff" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
            Edit User Permissions
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
            <FormControlLabel
              control={<Checkbox checked={permissions.viewAllTasks} onChange={handlePermissionChange} name="viewAllTasks" sx={{ color: "#fff" }} />}
              label="View All Tasks"
            />
            <FormControlLabel
              control={<Checkbox checked={permissions.editAllTasks} onChange={handlePermissionChange} name="editAllTasks" sx={{ color: "#fff" }} />}
              label="Edit All Tasks"
            />
            <FormControlLabel
              control={<Checkbox checked={permissions.deleteAllTasks} onChange={handlePermissionChange} name="deleteAllTasks" sx={{ color: "#fff" }} />}
              label="Delete All Tasks"
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#1e1e1e" }}>
            <Button onClick={() => setOpen(false)} sx={{ color: "#fff" }}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#ff5722", color: "#fff" }}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

