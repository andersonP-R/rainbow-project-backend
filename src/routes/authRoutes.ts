import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

// AUTH ROUTES ("/api/auth")
router.post("/login", authController.signIn);

export default router;
