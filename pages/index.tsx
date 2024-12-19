import { Box } from "@mui/material";
import { ToDoCard } from "@/components/TodoCard";

export default function Home() {
  return (
    <>
      <Box sx={{padding:1}}>
        <ToDoCard/>
      </Box>
    </>
  );
}
