import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // if you are using cookies for auth
});

// Signup
export const signup = (data) => API.post("/auth/signup", data);

// Login
export const login = (data) => API.post("/auth/login", data);

// Get user profile
export const getUser = () => API.get("/user/me");

// Example: fetch urls
export const getUrls = () => API.get("/urls");

export default API;
