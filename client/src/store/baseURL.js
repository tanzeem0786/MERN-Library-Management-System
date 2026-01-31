import axios from 'axios';
// import.meta.env.VITE_API_URL ||
export const api = axios.create({
  baseURL:  "http://localhost:4000",
  withCredentials: true,
});