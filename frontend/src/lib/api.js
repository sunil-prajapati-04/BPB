import axios from "axios";

const api = axios.create({
  baseURL: "https://bpb-koj7.onrender.com/bpb",
  withCredentials: true,
});

export default api;