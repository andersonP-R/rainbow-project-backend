import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ------------ ROUTES ----------------
// USERS
app.use("/api/users", userRoutes);

// AUTHENTICATION
app.use("/api/auth", authRoutes);

export default app;
