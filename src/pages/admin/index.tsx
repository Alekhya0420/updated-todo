import React, { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import {Box,Button,Container,List,ListItem,ListItemText,Paper,TextField,Typography,Dialog,DialogActions,DialogContent,
DialogTitle,IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { skipToken } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import toast from "react-hot-toast";

interface AuthAdminUser 
{
  userId: string;
  name: string; 
}

interface User 
{
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions:string|number|boolean|(string|number|boolean|null)[]|Record<string,unknown>|null;
  tasks: Task[];
}

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUBADMIN = "SUBADMIN",
}

interface Task {
  id: string;
  title: string;
  description?: string | null | undefined;
  deadline: string;
  completed: boolean;
  userId: string;
}

const AdminDashboard = () => {
  const [authUser, setAuthUser] = useState<AuthAdminUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  console.log("auth user",authUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser: AuthAdminUser = JSON.parse(storedUser);
        setAuthUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // console.log(authUser);
  
  const { data: users, refetch: refetchUsers } = trpc.admin.getAllUsers.useQuery();
  const { data: tasks, refetch: refetchTasks } = trpc.admin.getUserTasks.useQuery(selectedUser ?? skipToken, {
    enabled: !!selectedUser,
  });

  const deleteTask = trpc.task.deleteTask.useMutation({
    onSuccess: () => {refetchTasks()},
    onError: (error) => {
      console.error("Error deleting task:", error);
    }
  });

  const [editTask, setEditTask] = useState<Task | null>(null);

  const updateTask = trpc.admin.editTask.useMutation({
    onSuccess: () => {
      refetchTasks();
      setEditTask(null);
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    }
  });

  return (
    <Box display="flex" sx={{ backgroundColor: "#121212", minHeight: "100vh",color:"white"}}>
      <Sidebar />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom sx={{color:"red"}}>
        Welcome, Admin {authUser?.name}!
          {/* My 🛠 Admin Dashboard */}
        </Typography>

        <Box display="flex" gap={3}>
          <Paper elevation={3} sx={{ flex: 1, p: 3,bgcolor:"black",color:"red"}}>
            <Typography variant="h6">All users</Typography>
            <List sx={{border:"1px solid red"}}>
              {users?.map((user: User) => (
                <ListItem
                  key={user.id}
                  component="div"
                  onClick={() => setSelectedUser(user.id)}
                  sx={{ "&:hover": { bgcolor: "#f5f5f5",border:"1px solid red"}}}
                >

                  <ListItemText
  primary={`${user.name} | Role: ${user.role}`}
  secondary={
    <Typography component="span" sx={{ color: "red", fontWeight: "bold" }}>
      {`Tasks: ${user.tasks?.length || 0}`}
    </Typography>
  }
/>

                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Selected User's Tasks */}
          {selectedUser && (
            <Paper elevation={3} sx={{ flex: 2, p: 3,bgcolor:"black",color:"red" }}>
              <Typography variant="h6">All tasks</Typography>
              <List>


{tasks?.map((task: Task) => (
  <ListItem
    key={task.id}
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      bgcolor: "#121212", // Blackish background
      border: "1px solid red", // Red border
      color: "red", // Red text
      p: 1,
      mb: 1,
    }}
  >
    {/* Task Title */}
    <Typography variant="body1" sx={{ flex: 1, fontWeight: "bold", color: "red" }}>
      {task.title}
    </Typography>

    {/* Task Description */}
    <Typography variant="body2" sx={{ flex: 2, color: "red", textAlign: "center" }}>
      {task.description}
    </Typography>

    {/* Task Deadline */}
    <Typography variant="body2" sx={{ flex: 1, color: "red", textAlign: "right" }}>
      📅 {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}
    </Typography>

    {/* Edit & Delete Buttons */}
    <Box sx={{ ml: 2 }}>
      <IconButton
        sx={{ color: "red" }}
        onClick={() =>
          setEditTask({
            ...task,
            description: task.description || "",
            deadline: task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : "",
          })
        }
      >
        <EditIcon />
      </IconButton>
      <IconButton sx={{ color: "red" }} onClick={() => deleteTask.mutate(task.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  </ListItem>
))}

              </List>
            </Paper>
          )}
        </Box>

        {/* Edit Task Dialog */}
        {editTask && (

          <Dialog 
          sx={{ 
            "& .MuiDialog-paper": { 
              border: "1px solid gray",
              boxShadow: "0px 4px 10px rgba(255, 50, 50, 0.5)", // Stylish red shadow
              borderRadius: "12px",  // Slightly rounded corners for a modern look  
            } 
          }}
          open={Boolean(editTask)} onClose={() => setEditTask(null)}>
            <DialogTitle sx={{backgroundColor:"black",color:"red"}}>Edit Task</DialogTitle>
            <DialogContent sx={{backgroundColor:"black"}}>
              <TextField
                label="Task Title"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                fullWidth
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: "white" }, '&:hover fieldset': { borderColor: "gray" } } }}
                margin="dense"
              />
              <TextField
                label="Description"
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                fullWidth
                margin="dense"
                InputLabelProps={{ style: { color: "white" } }}
                sx={{ input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: "white" }, '&:hover fieldset': { borderColor: "gray" } } }}
              />
              <TextField
                label="Deadline"
                type="date"
                value={editTask.deadline}
                onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true, style: { color: "white" } }}                
                sx={{ input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: "white" }, '&:hover fieldset': { borderColor: "gray" } } }}
              />
            </DialogContent>
            <DialogActions sx={{backgroundColor:"black"}}>
              <Button sx={{backgroundColor:"black",color:"blue"}} onClick={() => setEditTask(null)}>Cancel</Button>
              <Button
                onClick={() =>
                  updateTask.mutate({
                    taskId: editTask.id,
                    title: editTask.title,
                    description: editTask.description,
                    deadline: editTask.deadline ? new Date(editTask.deadline).toISOString() : undefined,
                  })
                }
                variant="contained"
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>



        )}
      </Container>
    </Box>
  );
};

export default AdminDashboard;


