import { useEffect, useState } from "react";
import { Box, Button, Dialog, Grid, MenuItem, Select, Tab, TextField } from "@mui/material";
import { CardItem, fetchTodos } from "@/service/AxilosList";
import TodoThingsCard from "./TodoThingsCard";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export function ToDoCard() {
    const [todos, setTodos] = useState<CardItem[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [newTodoState, setNewTodoState] = useState<"Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified">("Unidentified");
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
            { userId: 1, id: prev.length + 1, title: newTodoTitle, completed: false, state: newTodoState },
        ]);
        setNewTodoTitle("");
        setNewTodoState("Unidentified");
        setIsPopup(false);
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
            prev.map((todo) =>
                todo.id === id ? { ...todo, state } : todo
            )
        );
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const filteredTodos = (category: string) => {
        if (category === "All") return todos;
        return todos.filter((todo) => todo.state === category);
    };

    return (
        <Box>
            <Button variant="contained" onClick={() => setIsPopup(true)}>
                Create
            </Button>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "#00000040"}}>
                    <TabList onChange={handleChange}>
                        <Tab label="All" value="All" />
                        <Tab label="Urgent" value="Urgent" />
                        <Tab label="Important" value="Important" />
                        <Tab label="Upcoming" value="Upcoming" />
                        <Tab label="Finished" value="Finished" />
                        <Tab label="Unidentified" value="Unidentified" />
                    </TabList>
                </Box>
                <TabPanel value="All">
                    <Grid container spacing={2}>
                        {filteredTodos("All").map((todo) => (
                            <Grid item xs={12} sm={6} md={3} key={todo.id}>
                                <TodoThingsCard
                                    todo={todo}
                                    changeStatus={changeStatus}
                                    editTitle={editTitle}
                                    todoCancel={todoCancel}
                                    updateCategory={updateCategory}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel value="Urgent">
                    <Grid container spacing={2}>
                        {filteredTodos("Urgent").map((todo) => (
                            <Grid item xs={12} sm={6} md={3} key={todo.id}>
                                <TodoThingsCard
                                    todo={todo}
                                    changeStatus={changeStatus}
                                    editTitle={editTitle}
                                    todoCancel={todoCancel}
                                    updateCategory={updateCategory}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel value="Important">
                    <Grid container spacing={2}>
                        {filteredTodos("Important").map((todo) => (
                            <Grid item xs={12} sm={6} md={3} key={todo.id}>
                                <TodoThingsCard
                                    todo={todo}
                                    changeStatus={changeStatus}
                                    editTitle={editTitle}
                                    todoCancel={todoCancel}
                                    updateCategory={updateCategory}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel value="Upcoming">
                    <Grid container spacing={2}>
                        {filteredTodos("Upcoming").map((todo) => (
                            <Grid item xs={12} sm={6} md={3} key={todo.id}>
                                <TodoThingsCard
                                    todo={todo}
                                    changeStatus={changeStatus}
                                    editTitle={editTitle}
                                    todoCancel={todoCancel}
                                    updateCategory={updateCategory}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel value="Finished">
                    <Grid container spacing={2}>
                        {filteredTodos("Finished").map((todo) => (
                            <Grid item xs={12} sm={6} md={3} key={todo.id}>
                                <TodoThingsCard
                                    todo={todo}
                                    changeStatus={changeStatus}
                                    editTitle={editTitle}
                                    todoCancel={todoCancel}
                                    updateCategory={updateCategory}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel value="Unidentified">
                    <Grid container spacing={2}>
                        {filteredTodos("Unidentified").map((todo) => (
                            <Grid item xs={12} sm={6} md={3} key={todo.id}>
                                <TodoThingsCard
                                    todo={todo}
                                    changeStatus={changeStatus}
                                    editTitle={editTitle}
                                    todoCancel={todoCancel}
                                    updateCategory={updateCategory}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </TabContext>

            <Dialog open={isPopup} onClose={() => setIsPopup(false)}>
                <Box p={2}>
                    <TextField
                        fullWidth
                        label="Create New To Do List"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        sx={{mb:1}}
                    />
                    <Select
                    fullWidth
                            value={newTodoState}
                            onChange={(e) => setNewTodoState(e.target.value as "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified")}
                            sx={{mb:1}}
                        >
                            <MenuItem value="Urgent">Urgent</MenuItem>
                            <MenuItem value="Important">Important</MenuItem>
                            <MenuItem value="Upcoming">Upcoming</MenuItem>
                            <MenuItem value="Finished">Finished</MenuItem>
                            <MenuItem value="Unidentified">Unidentified</MenuItem>
                        </Select>
                    <Box>
                        <Button variant="contained" onClick={todoCreate} sx={{mr:1}} size="small">
                            OK
                        </Button>
                        <Button onClick={() => setIsPopup(false)} color="error" size="small">Cancel</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
