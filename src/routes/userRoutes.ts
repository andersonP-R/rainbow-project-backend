import { Router } from "express";
import UserController from "../controllers/userController";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

// USER ROUTES ("/api/users")
router.get("/", UserController.getUsers);
router.get("/:id", validateJWT, UserController.getUser);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);
router.get("/seed", UserController.seed);

export default router;
