import axios from "axios";
import Constants from "expo-constants";

// Week 8: all API calls use one shared axios instance.
// Week 9 Final Lab Task 2: the base URL comes from app.config.js.
export const BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});
