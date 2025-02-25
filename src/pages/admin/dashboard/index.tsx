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
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;

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

  console.log("users are",users);
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
                {/* {users?.map((user) => ( */}

{users?.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((user) => (

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

          <Box display="flex" justifyContent="center" mt={2}>
  <Button 
    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}  
    sx={{ color: "#fff", mr: 2 }}
  >
   (👈🏽)
  </Button>
  <Button 
    onClick={() => setPage((prev) => (users && (prev + 1) * rowsPerPage < users.length ? prev + 1 : prev))}  
    sx={{ color: "#fff" }}
  >
    (👉🏽)
  </Button>
</Box>

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

