import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ------------ ROUTES ----------------
// USERS
app.use("/api/users", userRoutes);

export default app;
