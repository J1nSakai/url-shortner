import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Enable sending cookies with requests
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorMessage = data?.message || "Invalid request";
          break;
        case 401:
          errorMessage = "Unauthorized access";
          break;
        case 403:
          errorMessage = "Access forbidden";
          break;
        case 404:
          errorMessage = "Resource not found";
          break;
        case 409:
          errorMessage = data?.message || "Conflict occurred";
          break;
        case 500:
          errorMessage = "Server error occurred";
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = "Network error - please check your connection";
    } else {
      // Something else happened
      errorMessage = error.message || "Request failed";
    }

    console.error("API Error:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    // Create a custom error object with user-friendly message
    const customError = new Error(errorMessage);
    customError.status = error.response?.status;
    customError.originalError = error;

    return Promise.reject(customError);
  }
);

export default axiosInstance;
