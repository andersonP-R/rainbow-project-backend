import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import ProductController from "../controllers/productController";

const router = Router();

// USER ROUTES ("/api/products")
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);

export default router;
