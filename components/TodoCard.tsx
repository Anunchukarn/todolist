import { Grid } from "@mui/material";
import { CardItem } from "@/service/AxilosList";
import TodoThingsCard from "./TodoThingsCard";

export function ToDoCard({ todos, changeStatus, editTitle, todoCancel, updateCategory, category }: any) {
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
