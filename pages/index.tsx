import { useState, useEffect } from "react";
import { Box, Button, Tab, TextField, Dialog, MenuItem, Select } from "@mui/material";
import { ToDoCard } from "@/components/TodoCard";
import { CardItem, fetchTodos } from "@/service/AxilosList";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function Home() {
  const [todos, setTodos] = useState<CardItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoState, setNewTodoState] = useState<
    "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified"
  >("Unidentified");
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [value, setValue] = useState("All");

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        const updatedTodos = data.slice(0, 10).map((todo: CardItem) => ({
          ...todo,
          state: todo.state || "Unidentified",
        }));
        setTodos(updatedTodos);
      })
      .catch((err) => console.error(err));
  }, []);

  const todoCreate = () => {
    setTodos((prev) => [
      ...prev,
      {
        userId: 1,
        id: prev.length + 1,
        title: newTodoTitle,
        completed: false,
        state: newTodoState,
      },
    ]);
    setNewTodoTitle("");
    setNewTodoState("Unidentified");
    setIsPopup(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const changeStatus = (id: number, status: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: status } : todo
      )
    );
  };

  const editTitle = (id: number, title: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  const todoCancel = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: `Cancel: ${todo.title}` } : todo
      )
    );
  };

  const updateCategory = (id: number, state: "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified") => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, state } : todo))
    );
  };

  const state = ["All", "Urgent", "Important", "Upcoming", "Finished", "Unidentified",];

  return (
    <Box sx={{ padding: 1 }}>
      <Button variant="contained" onClick={() => setIsPopup(true)}>
        Create
      </Button>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "#00000040" }}>
          <TabList onChange={handleChange}>
            {state.map((category) => (
              <Tab label={category} value={category} key={category} />
            ))}
          </TabList>
        </Box>
        {state.map((category) => (
          <TabPanel value={category} key={category} className="ah">
            <ToDoCard
              todos={todos}
              changeStatus={changeStatus}
              editTitle={editTitle}
              todoCancel={todoCancel}
              updateCategory={updateCategory}
              category={category}
            />
          </TabPanel>
        ))}
      </TabContext>

      <Dialog open={isPopup} onClose={() => setIsPopup(false)}>
        <Box p={2}>
          <TextField
            fullWidth
            label="Create New To Do List"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Select
            fullWidth
            value={newTodoState}
            onChange={(e) => setNewTodoState(e.target.value as | "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified")}
            sx={{ mb: 1 }}
          >
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="Important">Important</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Finished">Finished</MenuItem>
            <MenuItem value="Unidentified">Unidentified</MenuItem>
          </Select>
          <Box>
            <Button
              variant="contained"
              onClick={todoCreate}
              sx={{ mr: 1 }}
              size="small"
            >
              OK
            </Button>
            <Button
              onClick={() => setIsPopup(false)}
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
