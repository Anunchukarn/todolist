import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
//https://api.themoviedb.org/3/discover/movie?api_key=e6e8635222fd462eaa37ed7bc9713a05&primary_release_year=2022
// สร้าง instance ของ axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Export axios instance
export default api;