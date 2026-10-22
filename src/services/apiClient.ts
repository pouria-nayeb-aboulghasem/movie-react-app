import { API_BASE_URL } from "@/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
  headers: {
    Accept: "application/json",
  },
});

export default apiClient;
