import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration for production and development
const allowedOrigins = [
	"http://localhost:5173",
	"https://social-media-website-frontend-s8nm.onrender.com"
];

app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin (like mobile apps, curl, etc.)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			} else {
				return callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);

app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
app.use(cookieParser());

// Add a root route for a friendly message
app.get('/', (req, res) => {
	res.send('Backend API is running!');
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", message: "Server is running" });
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	connectDB();
});
