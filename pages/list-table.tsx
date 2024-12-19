import { Box } from "@mui/material";
import {ToDoList} from "@/components/TodoList";

export default function Home() {
  return (
    <>
      <Box sx={{padding:1}}>
        <ToDoList/>
      </Box>
    </>
  );
}
