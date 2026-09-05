import Constants from "expo-constants";

// Week 9 Final Lab Task 2: the API base URL now comes from app.config.js.
// Development (default): http://localhost:3000
// Production: https://api.yourapp.com placeholder from EXPO_PUBLIC_ENV=production.
export const BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000";
