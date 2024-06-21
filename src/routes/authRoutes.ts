import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

// AUTH ROUTES ("/api/auth")
router.post("/login", authController.signIn);
router.get("/session/:token", authController.getSession);

export default router;
