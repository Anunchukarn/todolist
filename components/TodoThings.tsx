import { TodoItem, fetchTodos } from "@/service/AxilosList";
import { Box, Typography, IconButton, Button, Dialog, TextField, Checkbox, TableCell, TableRow } from "@mui/material";

interface TodoItemProps{
    todo:TodoItem;
    changeStatus:(id:number, status:boolean) => void;
    editTitle:(id:number, title:string) => void;
    todoCancel:(id:number) => void;
}

export default function TodoThings({todo,changeStatus,editTitle,todoCancel}: TodoItemProps) {

    const checkBoxStatus =() =>{
        changeStatus(todo.id, !todo.completed);
    };

    const editClick =() => {
        const newTitle = prompt("Edit", todo.title);
        if(newTitle){
            editTitle(todo.id, newTitle);
        }
    };

    const statusColor = todo.completed? "green" : todo.title.startsWith("Cancel") ? "red" : "yellow"; 

    return (
        <TableRow>
            <TableCell>
                {!todo.title.startsWith("Cancel") &&(<Checkbox checked={todo.completed} onChange={checkBoxStatus} />)}
            </TableCell>
            <TableCell>
                <Typography sx={{ color: "default" }}>
                    {todo.id}. {todo.title}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ backgroundColor: statusColor, p: "4px", borderRadius: "4px", color: "default" }}>
                    {todo.completed ? "DONE" : todo.title.startsWith("Cancel") ? "CANCEL" : "IN PROGRESS"}
                </Typography>
            </TableCell>
            <TableCell>
                {!todo.title.startsWith("Cancel") && !todo.completed && (
                    <>
                        <Button onClick={editClick}>Edit</Button>
                        <Button color="error" onClick={() => todoCancel(todo.id)}>
                            Cancel
                        </Button>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
}