import axios from "axios";

const getBaseURL = () => {
	if (import.meta.env.MODE === "development") {
		return "http://localhost:5000";
	} else {
		// Production - use environment variable or default
		return import.meta.env.VITE_API_URL || "https://social-media-website-i5es.onrender.com";
	}
};

export const axiosInstance = axios.create({
	baseURL: getBaseURL(),
	withCredentials: true,
});
