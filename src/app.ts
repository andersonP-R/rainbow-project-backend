import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import searchRoutes from "./routes/searchRoutes";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// ------------ ROUTES ----------------
// USERS
app.use("/api/users", userRoutes);

// PRODUCTS
app.use("/api/products", productRoutes);

// PRODUCTS - FILTERED
app.use("/api/search", searchRoutes);

// AUTHENTICATION
app.use("/api/auth", authRoutes);

export default app;
