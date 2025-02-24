import { trpc } from "@/utils/trpc";
import { Checkbox, List, ListItem, ListItemText, Button } from "@mui/material";

const TaskList = () => {
  const { data: tasks, refetch } = trpc.task.getTasks.useQuery("USER_ID");
  const toggleTask = trpc.task.toggleTask.useMutation({ onSuccess: () => refetch() });
  const deleteTask = trpc.task.deleteTask.useMutation({ onSuccess: () => refetch() });

  return (
    <List>
      {tasks?.map((task) => (
        <ListItem key={task.id}>
          <Checkbox checked={task.completed} onChange={() => toggleTask.mutate(task.id)} />
          <ListItemText primary={task.title} style={{ textDecoration: task.completed ? "line-through" : "none" }} />
          <Button onClick={() => deleteTask.mutate(task.id)} color="error">Delete</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
