import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

// USER ROUTES ("/api/users")
router.get("/", UserController.getUsers);
router.get("/test", UserController.test);

export default router;
