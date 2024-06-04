import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

// USER ROUTES ("/api/users")
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.get("/seed", UserController.seed);

export default router;
