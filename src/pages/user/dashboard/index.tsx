import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import {Box,Button,Checkbox,Container,List,ListItem,ListItemText,Paper,TextField,Typography,IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { skipToken } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import UserSidebar from "@/components/UserSidebar";


interface AuthUser {
  userId: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description?: string | null | undefined;
  completed: boolean;
  deadline: string;
}

const UserDashboard = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAuthUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  console.log(authUser);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ title: string; description?: string; deadline: string }>();

  const { data: tasks, refetch } = trpc.task.getTasks.useQuery(authUser?.userId ?? skipToken, {
    enabled: !!authUser,
  });

  const createTask = trpc.task.createTask.useMutation({
    onSuccess: () => {
      refetch();
      reset();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    }
  });

  const toggleTask = trpc.task.toggleTask.useMutation({
    onSuccess: () => {refetch(), toast.success("Task status updated successfully!")},
    onError: (error) => {
      console.error("Error updating task status:", error);
    }
  });

  const deleteTask = trpc.task.deleteTask.useMutation({
    onSuccess: () => {refetch(), toast.success("Task deleted successfully!")},
    onError: (error) => {
      console.error("Error deleting task:", error);
    }
  });

  const onSubmit = (data: { title: string; description?: string; deadline: string }) => {
    if (!authUser) {
      console.error("No authenticated user found.");
      return;
    }
    createTask.mutate({
      ...data,
      description: data.description || "",
      deadline: data.deadline || "",
      userId: authUser.userId,
    });
  };

  // Handle drag-and-drop reordering
  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside a valid area

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId === "completed";

    toggleTask.mutate(taskId);
  };

  return (
    <Box display="flex" sx={{bgcolor:"#121212",pb:"130px"}}>
      <UserSidebar />
      <Container maxWidth="md" sx={{bgcolor:"#121212"}}>
        <Typography variant="h4" align="center" color="red" gutterBottom>
          Hello {authUser?.name} 👋🏽
        </Typography>

        {/* Task Form */}
        <Paper 
  elevation={6} 
  sx={{ 
    p: 3, 
    mb: 3, 
    bgcolor: "#121212", 
    color: "#ffffff", 
    borderRadius: 2, 
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)"
  }}
>
  <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      label="Task Title"
      {...register("title", { required: "Title is required" })}
      error={!!errors.title}
      helperText={errors.title?.message}
      fullWidth
      margin="normal"
      variant="outlined"
      sx={{
        input: { color: "#ffffff" },
        label: { color: "#b0b0b0" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#424242" },
          "&:hover fieldset": { borderColor: "#ffffff" },
          "&.Mui-focused fieldset": { borderColor: "#ff1744" }
        }
      }}
    />

<TextField
  label="Description"
  {...register("description")}
  multiline
  rows={3}
  fullWidth
  margin="normal"
  variant="outlined"
  sx={{
    "& .MuiInputBase-input": { color: "#ffffff" }, // Ensures text inside textarea is white
    "& .MuiInputLabel-root": { color: "#b0b0b0" }, // Label color gray
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#424242" },
      "&:hover fieldset": { borderColor: "#ffffff" },
      "&.Mui-focused fieldset": { borderColor: "#ff1744" }
    }
  }}
/>


    <TextField
      label="Deadline"
      type="date"
      {...register("deadline", { required: "Deadline is required" })}
      error={!!errors.deadline}
      helperText={errors.deadline?.message}
      fullWidth
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      sx={{
        input: { color: "#ffffff" },
        label: { color: "#b0b0b0" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#424242" },
          "&:hover fieldset": { borderColor: "#ffffff" },
          "&.Mui-focused fieldset": { borderColor: "#ff1744" }
        }
      }}
    />

    <Button 
      type="submit" 
      variant="contained" 
      startIcon={<AddIcon />} 
      fullWidth 
      sx={{ 
        mt: 2, 
        bgcolor: "#ff1744", 
        "&:hover": { bgcolor: "#d50000" }
      }}
    >
      Add Task
    </Button>
  </form>
</Paper>


        {/* Drag and Drop Context */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Box sx={{ display: "flex", gap: 3}}>
            {/* Incomplete Tasks */}
            <Paper elevation={3} sx={{ p: 3, flex: 1,backgroundColor:"black",color:"white"}}>
              <Typography variant="h6" gutterBottom>
                ❌ Incomplete Tasks
              </Typography>

              <Droppable droppableId="incomplete">
                {(provided) => (
                  <List ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks?.filter((task: Task) => !task.completed).map((task: Task, index: number) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            secondaryAction={
                              <IconButton onClick={() => deleteTask.mutate(task.id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <Checkbox
                              icon={<RadioButtonUncheckedIcon  sx={{color:"red"}}/>}
                              checkedIcon={<CheckCircleOutlineIcon />}
                              checked={task.completed}
                              onChange={() => toggleTask.mutate(task.id)}
                            />
                            <ListItemText sx={{color:"red",border:"1px solid red"}}
                              primary={task.title}
                              secondary={
                                <>
                                  {task.description && <Typography variant="body2" 
                                  sx={{color:"red"}}>{task.description}</Typography>}
                                  {task.deadline && (
                                    <Typography
                                      variant="caption"
                                      color={new Date(task.deadline) < new Date() ? "error" : "textSecondary"}
                                      fontWeight="bold"
                                      color="red"
                                    >
                                      📅 Deadline: {new Date(task.deadline).toLocaleDateString()}
                                    </Typography>
                                  )}
                                </>
                              }
                            />
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Paper>

            {/* Completed Tasks */}
            <Paper elevation={3} sx={{p:3,flex:1,backgroundColor:"black",color:"white"}}>
              <Typography variant="h6" gutterBottom>
                ✅ Completed Tasks
              </Typography>

              <Droppable droppableId="completed">
                {(provided) => (
                  <List ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks?.filter((task: Task) => task.completed).map((task: Task, index: number) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            secondaryAction={
                              <IconButton onClick={() => deleteTask.mutate(task.id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            }
                            sx={{
                        border: "1px solid #ff1744", borderRadius: "8px",padding: "10px",marginBottom: "8px",
                        backgroundColor: "#1e1e1e", 
                            }}
                          >
                            <Checkbox
                              icon={<RadioButtonUncheckedIcon   sx={{color:"red"}}/>}
                              checkedIcon={<CheckCircleOutlineIcon sx={{color:"red"}} />}
                              checked={task.completed}
                              onChange={() => toggleTask.mutate(task.id)}
                            />
                            <ListItemText
                              primary={task.title}
                              primaryTypographyProps={{ sx: { color: "red", fontWeight: "bold" } }}
                              secondary={
                                <>
                                  {task.description && <Typography variant="body2" sx={{color:"red"}}>{task.description}</Typography>}
                                  {task.deadline && (
                                    <Typography variant="caption" color="red" fontWeight="bold">
                                      📅 Deadline: {new Date(task.deadline).toLocaleDateString()}
                                    </Typography>
                                  )}
                                </>
                              }
                              sx={{ textDecoration: "line-through" }}
                            />
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Paper>
          </Box>
        </DragDropContext>
      </Container>
    </Box>
  );
};

export default UserDashboard;






