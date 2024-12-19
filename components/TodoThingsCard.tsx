import { CardItem } from "@/service/AxilosList";
import { Typography, Button, Checkbox, FormControl, Select, MenuItem, SelectChangeEvent, CardContent, CardActions, Card } from "@mui/material";

interface TodoItemProps {
    todo: CardItem;
    changeStatus: (id: number, status: boolean) => void;
    editTitle: (id: number, title: string) => void;
    todoCancel: (id: number) => void;
    updateCategory: (id: number, state: "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified") => void;
}

export default function TodoThingsCard({ todo, changeStatus, editTitle, todoCancel, updateCategory }: TodoItemProps) {

    const checkBoxStatus = () => {
        changeStatus(todo.id, !todo.completed);
    };

    const editClick = () => {
        const newTitle = prompt("Edit", todo.title);
        if (newTitle) {
            editTitle(todo.id, newTitle);
        }
    };

    const statusColor = todo.completed ? "lime" : todo.title.startsWith("Cancel") ? "red" : "yellow";

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        updateCategory(todo.id, event.target.value as "Urgent" | "Important" | "Upcoming" | "Unidentified" | "Finished");
    };

    return (
        <Card sx={{ mb: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {todo.id}. {todo.title}
                </Typography>
                <Typography
                    sx={{
                        display: "inline-block",
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        backgroundColor: statusColor,
                        color:"rgb(99, 99, 99)",
                    }}
                >
                    {todo.completed
                        ? "DONE"
                        : todo.title.startsWith("Cancel")
                        ? "CANCEL"
                        : "IN PROGRESS"}
                </Typography>
            </CardContent>
            <CardActions>
                <Checkbox checked={todo.completed} onChange={checkBoxStatus} disabled={todo.title.startsWith("Cancel")} />
                <Button size="small" onClick={editClick} disabled={todo.completed || todo.title.startsWith("Cancel")}>
                    Edit
                </Button>
                <Button size="small" color="error" onClick={() => todoCancel(todo.id)} disabled={todo.completed || todo.title.startsWith("Cancel")}>
                    Cancel
                </Button>
                <FormControl size="small" sx={{ ml: 2, minWidth: 120 }}>
                    <Select value={todo.state || ""} onChange={handleCategoryChange} displayEmpty>
                        <MenuItem value="Urgent">Urgent</MenuItem>
                        <MenuItem value="Important">Important</MenuItem>
                        <MenuItem value="Upcoming">Upcoming</MenuItem>
                        <MenuItem value="Finished">Finished</MenuItem>
                        <MenuItem value="Unidentified">Unidentified</MenuItem>
                    </Select>
                </FormControl>
            </CardActions>
        </Card>
    );
}