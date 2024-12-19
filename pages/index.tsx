import { Box } from "@mui/material";
import {ToDoList} from "@/components/TodoList";
import { ToDoCard } from "@/components/TodoCard";
// import {TodoPopup} from "@/components/TodoPopup";

export default function Home() {
  return (
    <>
      <Box sx={{padding:1}}>
        {/* <ToDoList/> */}
        <ToDoCard/>
      </Box>
    </>
  );
}
