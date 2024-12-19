import axios from './axios';

export interface TodoItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type CardItem = TodoItem & {
    state?: "Urgent" | "Important" | "Upcoming"  | "Finished" | "Unidentified";
}

export const fetchTodos = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response.data;
};
