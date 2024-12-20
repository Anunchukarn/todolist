import { Grid } from "@mui/material";
import { CardItem } from "@/service/AxilosList";
import TodoThingsCard from "./TodoThingsCard";

interface ToDoCardProps {
    todos: CardItem[];
    changeStatus: (id: number, status: boolean) => void;
    editTitle: (id: number, title: string) => void;
    todoCancel: (id: number) => void;
    updateCategory: (id: number, state: "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified") => void;
    category: "All" | "Urgent" | "Important" | "Upcoming" | "Finished" | "Unidentified";
}

export function ToDoCard({ todos, changeStatus, editTitle, todoCancel, updateCategory, category }: ToDoCardProps) {
    const filteredTodos = (category: string) => {
        if (category === "All") return todos;
        return todos.filter((todo: CardItem) => todo.state === category);
    };

    return (
        <Grid container spacing={2} className="eh">
            {filteredTodos(category).map((todo: CardItem) => (
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
    );
}
