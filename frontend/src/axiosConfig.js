import axios from 'axios';

// Set the base URL based on the environment
const BASE_URL = "http://localhost:5000";

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // This is useful for cookies and credentials
});

// Add a request interceptor to attach the JWT token if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken'); // Get token from local storage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach the token
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Handle request error
});

// Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response) {
            // Handle errors returned from the server
            if (error.response.status === 401) {
                // Redirect to login page or show a message
                console.error('Unauthorized: Please log in again.');
            } else if (error.response.status === 403) {
                console.error('Forbidden: Access denied.');
            } else {
                console.error('Error:', error.response.data.message || 'An error occurred');
            }
        } else {
            // Handle errors not related to response (network errors, etc.)
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error); // Reject the promise with the error
    }
);

export default axiosInstance;
