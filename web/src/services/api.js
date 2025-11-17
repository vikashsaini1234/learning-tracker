import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
});

// Interceptor to catch cold-start or connection issues
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // No response -> Render cold start or network issue
      return Promise.reject({
        message: "Backend is waking up. Please wait 10–20 seconds...",
        isColdStart: true,
      });
    }

    // Standard backend errors
    return Promise.reject({
      message: error.response.data?.message || "Something went wrong",
      status: error.response.status,
    });
  }
);

export default api;
