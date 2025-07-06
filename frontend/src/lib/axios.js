import axios from "axios";

const getBaseURL = () => {
	if (import.meta.env.MODE === "development") {
		return "http://localhost:5000";
	} else {
		// Production - use environment variable or default
		return import.meta.env.VITE_API_URL || "https://your-backend-app.onrender.com";
	}
};

export const axiosInstance = axios.create({
	baseURL: getBaseURL(),
	withCredentials: true,
});
