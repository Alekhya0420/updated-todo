import {useState,useContext} from "react";
import {AbilityContext} from "@/context/AbilityContext";
import {trpc} from "@/utils/trpc";
import {
Container,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
Button,CircularProgress,Box,Dialog,DialogTitle,DialogContent,DialogActions,TextField,IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function SubadminDashboard() {
  const ability = useContext(AbilityContext);
  const { data: tasks, isLoading, refetch, error } = trpc.subadmin.getAllTasks.useQuery();
  const { mutate: deleteTask } = trpc.subadmin.deleteTask.useMutation({
    onSuccess: () => refetch(),
    onError: (err) => console.error("Error deleting task:", err),
  });
  const { mutate: updateTask } = trpc.subadmin.updateTask.useMutation();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({id:"",title:"",description:"",deadline:""});
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 3;

  const handleEditClick = (task) => {
    setSelectedTask({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline).toISOString().split("T")[0],
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleUpdateTask = () => {
    updateTask(selectedTask, {
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
      onError: (err) => console.error("Error updating task:", err),
    });
  };

  const filteredTasks = tasks?.filter((task) =>
    task.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleNextPage = () => setPage((prev) => (prev + 1) * rowsPerPage < tasks.length ? prev + 1 : prev);
  const handlePrevPage = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));

  if (isLoading) return <CircularProgress sx={{ color: "#ff1744" }} />;
  if (error) return <Typography color="error">Error loading tasks</Typography>;

  return (
    <Box display="flex" bgcolor="#121212" color="white" minHeight="100vh">
      <Container maxWidth="md" sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#ff1744", fontWeight: "bold" }}>
          Subadmin Dashboard
        </Typography>

        {ability.can("view", "Task") ? (
          <TableContainer component={Paper} sx={{ bgcolor: "#1e1e1e" }}>
            <TextField
  fullWidth
  placeholder="Search by Name"
  variant="outlined"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    bgcolor: "#1e1e1e",
    input: { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "#ff1744" },
      "&.Mui-focused fieldset": { borderColor: "#ff1744" },
    },
  }}
/>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#ff1744", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#ff1744", fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ color: "#ff1744", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "#ff1744", fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ color: "#ff1744", fontWeight: "bold" }}>Deadline</TableCell>
                  <TableCell sx={{ color: "#ff1744", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                  <TableRow key={task.id}>
                    <TableCell sx={{ color: "white" }}>{task.user?.name || "Unknown"}</TableCell>
                    <TableCell sx={{ color: "white" }}>{task.title}</TableCell>
                    <TableCell sx={{ color: task.completed ? "green" : "red", fontWeight: "bold" }}>
                      {task.completed ? "Completed ✅" : "Pending ⏳"}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{task.description}</TableCell>
                    <TableCell sx={{ color: "white" }}>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {ability.can("edit", "Task") && (
                        <Button
                          startIcon={<EditIcon />} variant="contained"
                          sx={{ bgcolor: "#ff1744", color: "white", mr: 1 }}
                          onClick={() => handleEditClick(task)}
                        >
                          Edit
                        </Button>
                      )}
                      {ability.can("delete", "Task") && (
                        <Button
                          startIcon={<DeleteIcon />} variant="contained" color="error"
                          onClick={() => deleteTask({ taskId: task.id })}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
              <IconButton onClick={handlePrevPage} disabled={page === 0} sx={{ color: "white" }}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton onClick={handleNextPage} disabled={(page + 1) * rowsPerPage >= tasks.length} sx={{ color: "white" }}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </TableContainer>
        ) : (
          <Typography color="error">You do not have permission to view tasks</Typography>
        )}

        {/* Edit Task Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ bgcolor: "#121212", color: "white" }}>Edit Task</DialogTitle>
          <DialogContent sx={{ bgcolor: "#121212" }}>
            <TextField fullWidth margin="dense" label="Title" variant="outlined" value={selectedTask.title}
              onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })} sx={{ input: { color: "white" } }} />
            <TextField fullWidth margin="dense" label="Description" multiline variant="outlined" value={selectedTask.description}
              onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} sx={{ input: { color: "white" } }} />
            <TextField fullWidth margin="dense" type="date" label="Deadline" variant="outlined" value={selectedTask.deadline}
              onChange={(e) => setSelectedTask({ ...selectedTask, deadline: e.target.value })} sx={{ input: { color: "white" } }} />
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#121212" }}>
            <Button onClick={handleClose} sx={{ color: "#ff1744" }}>Cancel</Button>
            <Button onClick={handleUpdateTask} sx={{ bgcolor: "#ff1744", color: "white" }} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}


