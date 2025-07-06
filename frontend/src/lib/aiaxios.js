import axios from "axios";

export const aiAxiosInstance = axios.create({
    baseURL: "http://localhost:5001", // Python Flask backend
    withCredentials: true,
});