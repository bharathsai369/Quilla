import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

console.log(BASE_URL);
const api = axios.create({
  baseURL: BASE_URL,
});

// console.log(api);

export default api;
