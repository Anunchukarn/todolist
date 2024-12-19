import { useEffect, useState } from "react";
import { Box, Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { TodoItem, fetchTodos } from "@/service/AxilosList";
import TodoThings from "./TodoThings";

export function ToDoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [isPopup, setIsPopup] = useState(false);

    useEffect(() => {
        fetchTodos()
            .then((data) => setTodos(data))
            .catch((err) => console.error(err));
    }, []);

    const todoCreate = () => {
        setTodos((prev) => [
            ...prev,
            { userId: 1, id: prev.length + 1, title: newTodo, completed: false },
        ]);
        setNewTodo("");
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

    return (
        <Box>
            <Button variant="contained" onClick={() => setIsPopup(true)}>
                Create
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>To Do</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit/Cancel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((todo) => (
                            <TodoThings
                                key={todo.id}
                                todo={todo}
                                changeStatus={changeStatus}
                                editTitle={editTitle}
                                todoCancel={todoCancel}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isPopup} onClose={() => setIsPopup(false)}>
                <Box p={2}>
                    <TextField
                        fullWidth
                        label="Create New To Do List"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <Box>
                        <Button variant="contained" onClick={todoCreate}>
                            OK
                        </Button>
                        <Button onClick={() => setIsPopup(false)}>Cancel</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
