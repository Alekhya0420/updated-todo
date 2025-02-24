import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { trpc } from "../utils/trpc";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const createTask = trpc.task.createTask.useMutation({ onSuccess: () => window.location.reload() });

  const handleAddTask = () => {
    console.log("User ID being sent:", "USER_ID");
    // createTask.mutate({ title, userId: "USER_ID" });
  }
  return (
    <div>
      <TextField label="New Task" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
      <Button onClick={handleAddTask} variant="contained">
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
