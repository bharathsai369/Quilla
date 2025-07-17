import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";
// : import.meta.env.VITE_API_URL ?? "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
