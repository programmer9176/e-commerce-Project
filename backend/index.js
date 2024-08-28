import express from "express";
import colors from "colors";
import morgan from "morgan";
import database from './db/database.js';
import authRoutes from "./Routes/AuthRoutes.js";
import categoryRoutes from "./Routes/CategoryRoute.js";
import dotenv from "dotenv";
import cors from "cors"

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Logger middleware
app.use(morgan("dev"));

// Routes
app.use("/", authRoutes);
app.use("/", categoryRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.DEV_MODE}`.bgCyan.white);
});
